import datetime
import pandas as pd
import pandas.io.data
from pandas import DataFrame
import matplotlib.pyplot as plt
# from matplotlib import style

sp500 = pd.io.data.get_data_yahoo('%5EGSPC', start=datetime.datetime(2000, 10, 1), end=datetime.datetime(2012, 1, 1))
print sp500.head()

sp500.to_csv('sp500_ohlc.csv')

'''
pip uninstall openpyxl
pip install openpyxl==1.8.6
https://www.youtube.com/watch?v=hxLdlx_aNrs&index=2&list=PLQVvvaa0QuDdktuSQRsofoGxC2PTSdsi7
'''