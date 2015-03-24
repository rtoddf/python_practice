import requests
import json
import prettytable
from pprint import pprint
headers = {'Content-type': 'application/json'} 
data = json.dumps({'seriesid': ['LASST130000000000003', 'LASST130000000000004', 'LASST130000000000005', 'LASST130000000000006'],'startyear':'2010', 'endyear':'2014'}) 
p = requests.post('http://api.bls.gov/publicAPI/v1/timeseries/data/', data=data, headers=headers) 
json_data = json.loads(p.text)

# print p.url
# pprint(p.content)
# pprint(json_data['Results'])
json_data_data = json_data['Results']['series']

json_file = open('../../data/state_labor_stats.json', 'w')
json_file.write(json.dumps(json_data_data, indent=4))
json_file.close()

for series in json_data['Results']['series']:
    x=prettytable.PrettyTable(['series id','year','period','value','footnotes'])
    seriesId = series['seriesID']
    for item in series['data']:
        year = item['year']
        period = item['period']
        value = item['value']
        footnotes=''
        # for footnote in item['footnotes']:
        #     if footnote:
        #         footnotes = footnotes + footnote['text'] + ','
        if 'M01' <= period <= 'M12':
            x.add_row([seriesId, year, period, value, footnotes[0:-1]])
    output = open('../../data/state_labor_stats.text', 'w')
    output.write (x.get_string())
    output.close()

'''
http://www.bls.gov/developers/api_python.htm
http://www.bls.gov/help/hlpforma.htm#CE
http://www.bls.gov/web/laus/laumstrk.htm
http://www.bloomberg.com/visual-data/state-by-state/q/jaaacaj/da:wq::0::0:
http://www.bloomberg.com/visual-data/
http://www.bls.gov/developers/api_unix.htm

HERE
http://www.bls.gov/
http://www.bls.gov/lau/
http://www.bls.gov/help/hlpforma.htm#SM
http://data.bls.gov/timeseries/LNS14000000
http://data.bls.gov/timeseries/LASST130000000000003
http://www.ncsl.org/research/labor-and-employment/2012-state-unemployment-rates.aspx
http://www.bls.gov/news.release/metro.t01.htm
END HERE

curl -i -X GET http://api.bls.gov/publicAPI/v1/timeseries/data/CFU0000008000
curl -i -X GET http://api.bls.gov/publicAPI/v1/timeseries/data/SMU19197801523800001
curl -i -X GET http://api.bls.gov/publicAPI/v1/timeseries/data/SMU13000000000000001
curl -i -X GET http://api.bls.gov/publicAPI/v1/timeseries/data/LASST130000000000003

LASST130000000000003
LASST060000000000003

LAUCN281070000000003
LAUCT130000000000003

12345678901234567890
SMU19197801523800001

123 - 45 - 67890 - 12345678 - 90
SMU - 19 - 19780 - 15238000 - 01

SMU - 13 - 00000 - 00000000 - 01
SMU13000000000000001


State: 19 - Iowa
Area Code: 19780 - Des Moines-West Des Moines, IA
SuperSector: 15 - total nonfarm
Industry Code: 238000    Specialty Trade Contractors
data type: 01 - All Employees, In Thousands

gives may 2014 = 11.1 * 1000 = 11,100



gives may 2014 = 4125.1 * 1000 = 41251000
'''






