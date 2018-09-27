import random

# INPUTS
num_observations_per_sim = 9
num_sims = 10000
k = 2

# CODE
kth_order_stats = []
for _ in range(num_sims):
    order_statistics = sorted([random.random() for _ in range(num_observations_per_sim)])
    kth_order_stats.append(order_statistics[k-1])

# OUTPUTS
print(sum(kth_order_stats) / num_sims)


