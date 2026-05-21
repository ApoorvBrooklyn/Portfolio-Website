---
title: "Neural Networks for Option Pricing: What Works and What Doesn't"
date: "2024-01-28"
description: "Notes from building option pricing models with neural networks at Qualitas Technologies. The gap between a working model and a deployable one is wider than you think."
tags: ["finance", "deep-learning", "pytorch", "fintech"]
---

At Qualitas Technologies I spent a few months building neural network-based option pricing models. The problem sounded clean on paper — replace the Black-Scholes formula with a network that can price complex instruments more accurately.

It turned out to be a good lesson in what "working" actually means in production ML.

## Why Neural Networks for Option Pricing?

Black-Scholes makes assumptions that break in practice — constant volatility, log-normal returns, no dividends. More sophisticated models like Heston and SABR add parameters but remain analytically tractable. Neural networks offer a different tradeoff: they can capture arbitrary non-linearity, but they're harder to interpret and calibrate.

For vanilla options, Black-Scholes is usually fine. For exotic options with path-dependent payoffs, barrier conditions, and early exercise features, neural networks start to look interesting.

## The Setup

A vanilla option pricing network takes five inputs:

- Spot price S
- Strike K  
- Time to expiry T (in years)
- Risk-free rate r
- Implied volatility σ

And outputs a price. Simple enough.

```python
class OptionPricer(nn.Module):
    def __init__(self, hidden_dim=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(5, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, 1),
            nn.Softplus()  # price must be non-negative
        )

    def forward(self, x):
        return self.net(x)
```

The `Softplus` at the end enforces non-negativity. You could use `ReLU` but `Softplus` is smooth, which matters when you take derivatives.

## Training Data

This is where it gets tricky. You can't just sample random (S, K, T, r, σ) values and compute prices with Black-Scholes — that just teaches the network to approximate Black-Scholes, which you already have.

Instead:
1. For vanilla options: use market data (option chains from exchanges).
2. For exotics: use Monte Carlo simulations as ground truth, which are expensive but correct.

For calibration to market data, the trick is to treat the network as a volatility surface interpolator. You learn to predict implied volatility across strikes and expiries, then price through the Black-Scholes formula. This hybrid approach is more interpretable and calibration is more stable.

## Greeks via Automatic Differentiation

One of the genuinely good things about a differentiable network is that you get delta, gamma, and vega for free:

```python
def compute_greeks(model, inputs):
    inputs = inputs.requires_grad_(True)
    price = model(inputs)
    
    grads = torch.autograd.grad(
        price.sum(), inputs, create_graph=True
    )[0]
    
    delta = grads[:, 0]   # dP/dS
    vega = grads[:, 4]    # dP/dσ
    
    # Gamma requires second derivative
    gamma = torch.autograd.grad(
        delta.sum(), inputs, create_graph=True
    )[0][:, 0]
    
    return delta, gamma, vega
```

This works and is fast. The gotcha: if your network isn't smooth enough, these derivatives are noisy. `SiLU` and `GELU` work better than `ReLU` for this reason.

## What Broke in Production

**Calibration speed.** A Monte Carlo simulation takes seconds per option. An inference call takes microseconds. The speed advantage is real, but you need to recalibrate the network regularly as market conditions change. We ended up with daily recalibration, which required a fast online training loop.

**Extrapolation.** Neural networks interpolate well but extrapolate poorly. When market conditions moved outside the training distribution (high volatility regimes), the network's prices diverged significantly from fair value. We added explicit out-of-distribution detection and fell back to Monte Carlo in those cases.

**Interpretability under stress.** When the pricing system gives an unusual number, a trader needs to understand why. With Black-Scholes you can explain every input's contribution. With a network, you're doing attribution analysis and hoping the explanation holds.

## The Honest Take

Neural network option pricers are genuinely useful, but as a complement to, not a replacement for, traditional models. The sweet spot is using them for fast inference on liquid, well-understood instruments while maintaining traditional models for edge cases and stress scenarios.

The romanticized version of "replace the quant library with a neural net" doesn't survive contact with real trading systems.
