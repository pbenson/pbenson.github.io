import random

# INPUTS
num_observations_per_sim = 9
num_sims = 10000
k = 3

# CODE
kth_order_stats = [sorted( [random.random() for _ in range(num_observations_per_sim)])[k-1] for _ in range(num_sims)]

# OUTPUTS
print(sum(kth_order_stats) / num_sims)
