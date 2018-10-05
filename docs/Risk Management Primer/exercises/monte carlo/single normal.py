import numpy as np

n = 100000
z = np.random.normal(0,1, n)
# Simple tests
print(np.mean(z)) # mean
print(np.std(z)) # standard deviation
z.sort()
q = 5 # quantile
print(np.percentile(z, q)) # 5% quantile
