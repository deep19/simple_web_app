import json

def find(name, slist):
    for i, ob in enumerate(slist):
        if ob['name'] == name:
            return i
    return -1


with open('rows.json') as data_file:
    ret = {'data':[]}
    data = json.load(data_file)
    movie_data = data['data']
    import pdb; pdb.set_trace()
    for movie in movie_data:
        name = movie[8]
        location = movie[10]
        index = find(name, ret['data'])
        if (index > -1):
            ret['data'][index]['locations'].append(location)
        else:
            ret['data'].append({'name': name, 'locations':[location]})



with open('row2.json', 'w') as outfile:
    json.dump(ret, outfile )

