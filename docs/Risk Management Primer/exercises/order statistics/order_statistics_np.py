import numpy as np

# INPUTS
num_observations_per_sim = 9
num_sims = 10000
k = 4

# CODE
kth_order_stats = [ np.sort(np.random.random(num_observations_per_sim))[k-1] for _ in range(num_sims)]
# NOTE: the following code is not correct because np.percentile has a different assumption

# kth_order_stats = [ np.percentile(np.random.random(num_observations_per_sim), 
#     k * 100/ (num_observations_per_sim + 1)) 
#         for _ in range(num_sims)]

# OUTPUTS
print(sum(kth_order_stats) / num_sims)
