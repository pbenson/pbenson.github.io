import numpy as np
from scipy.stats.stats import pearsonr

n = 5000
rho = 0
z1 = np.random.normal(0,1, n)
z2 = np.random.normal(0,1, n)
r1 = z1
r2 = rho * z1 + (1 - rho**2)**0.5 * z2

# Simple tests
print(np.mean(r2)) # mean
print(np.std(r2)) # standard deviation
r2.sort()
q = 5 # quantile
print(np.percentile(r2, q)) # 5% quantile
# correlation
