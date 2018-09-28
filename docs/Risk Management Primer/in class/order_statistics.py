import random

# INPUTS
num_observations_per_sim = 3
num_sims = 10000
k = 3

# CODE
quantile_sum = 0
for _ in range(num_sims):
    # perform one simulation
    uniforms = []
    for _ in range(num_observations_per_sim):
        # draw a random
        uniforms.append(random.random())
    uniforms.sort()
    quantile_sum += uniforms[k-1]

# OUTPUTS
print(quantile_sum / num_sims)

