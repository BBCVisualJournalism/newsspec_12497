# newsspec-12497: 100_women_facewall

Global news project focusing on 100 inspirational women

## Getting started

Generate markup from the data (see below first)

```
grunt data
```

Set up the project

```
grunt
```

Make images responsive

```
grunt images
```

Build World Service version

```
grunt translate
```

## Data

If you are asked to run a data update for this facewall, you will be sent the link to the Google spreadsheet.

Download this spreadsheet as tab-separated values (.tsv) and save it in `source/data/`.

Then, run `grunt data`. This will generate the files `list.tmpl` and `profile.tmpl`.

## iFrame scaffold

This project was built using the iFrame scaffold v1.8.2

## License
Copyright (c) 2015 BBC 
