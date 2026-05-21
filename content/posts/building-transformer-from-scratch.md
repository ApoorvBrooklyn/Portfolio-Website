---
title: "Building a Transformer from Scratch in PyTorch"
date: "2024-03-10"
description: "What I learned implementing the full transformer architecture without high-level abstractions — attention, positional encoding, and all the details that tutorials skip."
tags: ["pytorch", "transformers", "deep-learning"]
---

When I implemented my first transformer, I used `nn.TransformerEncoder` and called it a day. It worked, but I didn't really understand what was happening inside. So I started over — this time building every component from scratch.

Here's what I learned.

## The Attention Mechanism

The scaled dot-product attention is deceptively simple:

```
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
```

The `sqrt(d_k)` scaling matters more than it looks. Without it, large values of `d_k` push dot products into regions where the softmax gradient vanishes. The original paper calls this out explicitly, and I confirmed it empirically — training is noticeably unstable without the scaling when `d_k` is large.

```python
def scaled_dot_product_attention(q, k, v, mask=None):
    d_k = q.size(-1)
    scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, v), weights
```

## Multi-Head Attention

Multi-head attention runs several attention operations in parallel, each learning to attend to different representation subspaces.

The catch is in the reshaping. You split the embedding dimension across heads, not the sequence dimension. So for `d_model=512` and `h=8`, each head operates on 64-dimensional representations.

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        assert d_model % num_heads == 0
        self.d_k = d_model // num_heads
        self.h = num_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, q, k, v, mask=None):
        B = q.size(0)
        # Project and reshape into (B, h, seq, d_k)
        q = self.W_q(q).view(B, -1, self.h, self.d_k).transpose(1, 2)
        k = self.W_k(k).view(B, -1, self.h, self.d_k).transpose(1, 2)
        v = self.W_v(v).view(B, -1, self.h, self.d_k).transpose(1, 2)
        x, _ = scaled_dot_product_attention(q, k, v, mask)
        x = x.transpose(1, 2).contiguous().view(B, -1, self.h * self.d_k)
        return self.W_o(x)
```

## Positional Encoding

Since attention has no inherent notion of order, you inject position information directly into the embeddings. The original paper uses sinusoidal encodings:

```python
class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000, dropout=0.1):
        super().__init__()
        self.dropout = nn.Dropout(dropout)
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1).float()
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe.unsqueeze(0))

    def forward(self, x):
        x = x + self.pe[:, :x.size(1)]
        return self.dropout(x)
```

The sinusoidal form was chosen because it can generalize to sequence lengths not seen during training. In practice, most modern models use learned positional encodings anyway.

## What Actually Trips You Up

A few things that took me longer than they should have:

**The causal mask.** In the decoder, the self-attention layer should only attend to previous tokens. You construct a lower-triangular mask — but it's easy to apply it in the wrong place (encoder self-attention should see everything).

**Layer normalization placement.** The original paper does "post-norm" (apply LayerNorm after the residual connection). Most modern implementations do "pre-norm" (apply before the sublayer). Pre-norm is more stable during training.

**Weight initialization.** The original transformer uses Xavier initialization. PyTorch's `nn.Linear` defaults to a variation of this, but being explicit helps when debugging.

## What I Got From This

You can use transformers without building them, but building them makes you read the code differently. When a model performs poorly on long sequences, I now instinctively check the positional encoding strategy. When attention heads collapse, I check the scaling.

The code is on GitHub if you want to look through it: [github.com/ApoorvBrooklyn/Transformer-Model](https://github.com/ApoorvBrooklyn/Transformer-Model)
