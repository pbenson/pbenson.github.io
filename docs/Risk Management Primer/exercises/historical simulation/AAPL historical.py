import numpy as np
import pandas as pd

# INPUTS
file_name = "AAPL.csv"
price_col = 'Adj Close'

# CODE
# dataframe = pd.read_csv(file_name) 
dataframe = pd.read_csv(
    file_name,      # relative python path to subdirectory
    usecols=['Date', price_col],  # Only load the columns specified.
    parse_dates=['Date'],     # Intepret the Date column as a date
    skiprows=0         # Skip the first row of the file
)
# OUTPUTS
dataframe = dataframe[price_col] # sort
dataframe = dataframe[::-1] # sort
# returns = data
returns = np.log(dataframe / dataframe.shift(1))
print( returns.head() )
