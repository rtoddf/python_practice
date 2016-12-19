"""

> Preferably, I'd like the state, then each year under that, then each
set of data.

I find it useful to define ahead of time the structure we're trying to
build, and the structure of the incoming data, for reference.

So we are trying to produce a structure of this form, and write it out
as json:

{                   # a dictionary with states as keys
    'ny': {         # a dictionary with years as keys
        2004: [     # a dictionary with periods as keys
            {   # each dict contains statistics per period
                'year': 2004,
                'period': 1,
                'state_name': 'New York',
                'short_name': 'ny',
                'unemployment_percent': 2,
                'labor_force_total': 3,
                ...
                },
            {
                'year': 2004,
                'period': 2,
                'state_name': 'New York',
                'short_name': 'ny',
                'unemployment_percent': 3,
                'labor_force_total': 4,
                ...
                },
            { ... },
            ...
            ],
        2005: [ ... ],
        2006: [ ... ],
        ...
        },

    'ga': {
        2004: [ ... ],
        2005: [ ... ],
        ...
        },

    ...
    }

"""

import requests
import json
from datetime import date
from collections import defaultdict

base_url = 'http://api.bls.gov/publicAPI/v2/timeseries/data/'
prefix = 'LA'
seas_adj_code = 'S'
area_type_code = 'ST'
data_types = [3, 4, 5, 6]
data_labels = ['unemployment_percent', 'unemployment_total', 'employment_total', 'labor_force_total']
year_range = 1

def get_series_ids(state_id, data_type):
    series_ids = []
    series_ids.append('%s%s%s%02d%013d' % (prefix, seas_adj_code, area_type_code, int(state_id), int(data_type)))
    return series_ids


def get_api_json(code, datatype):
    headers = {'Content-type': 'application/json'}
    
    req_data = json.dumps({
        'seriesid': get_series_ids(code, datatype),
        'startyear': str(date.today().year - year_range),
        'endyear':str(date.today().year),
        'registrationKey':'1d0d9bdc5d07407bb04116bc4eaa4667',
        })

    print req_data
    # I recommend adding a thing here caches the result on disk so you
    # don't hammer on their servers while testing.
    return requests.post(base_url, data=req_data, headers=headers).json()


def main():
    # opens states file and reads all states and codes
    with open('../data/states.json', 'r') as state_file:
        states_data = json.load(state_file)

    # states_data now contains a structure of the form:
    #   [
    #       {'text':'New York', 'value':'ny', 'code':'abc123'},
    #       {'text':'Georgia', 'value':'ga', 'code':'abc345'},
    #       ...
    #       ]

    # this lets us say all_states[state][year][period] = foo and it will
    # automatically create those keys and inner dictionaries if they
    # don't yet exist.
    all_states = defaultdict(lambda: defaultdict(lambda: defaultdict(dict)))

    # loop through all states
    for state in states_data:
        state_longname = state['text']
        state_shortname = state['value']

        # loop through all datatypes
        for datalabel, datatype in zip(data_labels, data_types):
            # print " processing datatype %s" % datatype
            result_json = get_api_json(state['code'], datatype)

            # I don't know what series is but we're just smashing all
            # the data from each series into one blob
            # for series in result_json['Results']['series']:
            #     print "  processing series %s" % series['seriesID']
            #     for datum in series['data']:
            #         year = datum['year']
            #         period = datum['period']
            #         print "   processing datum year %s period %s" % (
            #                 year, period)

            #         # dump all the data from the datum into our
            #         # structure, along with some extra for good measure.
            #         # Warning: this will overwrite things if keys from
            #         # one are the same as keys from another. problem?
            #         datum[datalabel] = datum['value']
            #         del datum['value']
            #         all_states[state_shortname][year][period].update(
            #             datum,
            #             state_name=state_longname,
            #             short_name=state_shortname,
            #             )
        # break

    # replace each dictionary of period -> data with list of data sorted
    # by period
    # for state in all_states:
    #     print "cleaning state %s" % state
    #     for year in all_states[state]:
    #         print " cleaning year %s" % year
    #         all_states[state][year] = [v for _, v in sorted(all_states[state][year].items())]

    # write the result
    # print "writing result"
    # with open('../data/labor/state_labor_stats_test.json', 'w') as json_file:
    #         json.dump(all_states, json_file, indent=4)

if __name__ == '__main__':
    main()
