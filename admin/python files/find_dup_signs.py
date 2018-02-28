# Run through the list of signs and spit out any that have identical sign names

import json


def main():
    with open('ASLarraystripped.json', 'r') as infile:
        signlist = json.load(infile)
        print('Loaded')
        print(len(signlist['signs']))

        signlist = signlist['signs']
        for i in range(len(signlist)):
            for j in range(i+1, len(signlist)):
                if signlist[i]['sign'] == signlist[j]['sign']:
                    print(i, j, signlist[i]['sign'])
main()