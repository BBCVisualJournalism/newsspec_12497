module.exports = function (grunt) {
    grunt.registerTask('data', function () {

        var fs = require('fs');

        var datasheet = 'source/data/100 Women 2015 data - Sheet1.tsv';

        var list_file = 'source/tmpl/facewall/list.tmpl';
        var profile_file = 'source/tmpl/facewall/portrait.tmpl';

        var columns = {
            id: 0,
            firstname: 1,
            surname: 2,
            age: 3,
            job: 4,
            nationality: 5,
            bio_1: 6,
            bio_2: 7,
            bio_3: 8,
            desc: 9,
            filter: 10,
            image: 11,
            link_url: 12,
            link_text: 13
        };

        var data_passed = false;

        var getImageClassModifier = function (row_cells) {
            if (row_cells[columns.image].toLowerCase === 'y') {
                return row_cells[columns.id];
            } else {
                return 'silhouette';
            }
        }

        var generateListEntry = function (row_cells) {
            var markup = '';

            var img_class_mod = getImageClassModifier(row_cells);
            var filter_classes = 'ns_facewall__item ns_facewall__item--filtered';
            if (row_cells[columns.filter]) {
                filter_classes += ' ns_facewall__item--filter-' + row_cells[columns.filter].trim().toLowerCase();
            }

            markup += '<li class="' + filter_classes + '" id="ns_facewall__listitem--' + row_cells[columns.id] + '">\n';
            markup += '    <a class="ns_facewall__thumb ns_facewall__thumb--' + img_class_mod + '" href="#ns_facewall--' + row_cells[columns.id] + '">\n';
            markup += '        <span>' + row_cells[columns.firstname].trim() + ' ' + row_cells[columns.surname].trim() + '</span>\n';
            markup += '    </a>\n';
            markup += '    <div class="ns_facewall__tooltip">\n';
            markup += '        <span class="ns_facewall__tooltipname">' + row_cells[columns.desc].trim() + '</span>\n';
            markup += '    </div>\n';
            markup += '</li>\n';

            return markup;
        };

        var generateProfileEntry = function (row_cells) {
            var markup = '';

            var img_class_mod = getImageClassModifier(row_cells);

            markup += '<li class="ns_facewall__portrait" id="ns_facewall--' + row_cells[columns.id] + '">\n';
            markup += '    <h2 class="ns_facewall__name">' + 
                row_cells[columns.firstname].trim() + ' ' + row_cells[columns.surname].trim() + 
                '</h2>\n';
            markup += '    <div class="ns_facewall__portrait-img ns_facewall__portrait-img--' + img_class_mod + '"></div>\n';
            if (row_cells[columns.age]) {
                markup += '    <div class="ns_facewall__age portrait__atrribute">Age: ' + row_cells[columns.age].trim() + '</div>\n';
            }
            if (row_cells[columns.job]) {
                markup += '    <div class="ns_facewall__job portrait__atrribute">Job: ' + row_cells[columns.job].trim() + '</div>\n';
            }
            if (row_cells[columns.nationality]) {
                markup += '    <div class="ns_facewall__nationality portrait__atrribute">Nationality: ' + row_cells[columns.nationality].trim() + '</div>\n';
            }
            if (row_cells[columns.bio_1]) {
                markup += '    <p class="portrait__paragraph">' + row_cells[columns.bio_1].trim() + '</p>\n';
            }
            if (row_cells[columns.bio_2]) {
                markup += '    <p class="portrait__paragraph">' + row_cells[columns.bio_2].trim() + '</p>\n';
            }
            if (row_cells[columns.bio_3]) {
                markup += '    <p class="portrait__paragraph">' + row_cells[columns.bio_3].trim() + '</p>\n';
            }
            if (row_cells[columns.link_url] && row_cells[columns.link_text]) {
                markup += '    <div class="ns_facewall__link portrait__atrribute">\n';
                markup += '        <a href="' + row_cells[columns.link_url].trim() + '" target="_parent">' + row_cells[columns.link_text].trim() + '</a>\n';
                markup += '    </div>\n';
            }
            markup += '</li>\n';

            return markup;
        }

        var checkDataRow = function (row_cells) {
            var checkField = function () {
                if (arguments.length === 2) {
                    if (!row_cells[columns[arguments[0]]] || !row_cells[columns[arguments[1]]]) {
                        console.log('either field ' + arguments[0] + ' or ' + arguments[1] + ' in row with id ' + row_cells[columns.id] + ' is empty.');
                    }
                } else if (arguments.length === 1) {
                    if (!row_cells[columns[arguments[0]]]) {
                        console.log('field ' + columns[arguments[0]] + ' in row with id ' + row_cells[columns.id] + ' is empty.');
                    }
                }
            }

            checkField('firstname', 'surname');
            checkField('age');
            checkField('job');
            checkField('nationality');
            checkField('bio_1');
            checkField('desc');
            checkField('filter');
            checkField('image');
            // checkField('link_url', 'link_text');
        }

        var readData = function (datasheet) {
            var data = fs.readFileSync(datasheet, 'utf8');
            var buffer = new Buffer(data);
            var data_string = buffer.toString();
            var data_rows = data_string.split('\n').filter(Boolean);

            var list_markup = '',
                profile_markup = '';

            for (var row = 0; row < data_rows.length; row++) {
                var row_cells = data_rows[row].split('\t');

                // move on to next row if id is not an integer
                if (!Number.isInteger(parseInt(row_cells[columns.id]))) {
                    console.log('column 1 in row ' + (row + 1) + ' is not an integer, moving on to next row');
                    continue;
                }

                checkDataRow(row_cells);

                list_markup += generateListEntry(row_cells);
                profile_markup += generateProfileEntry(row_cells);

                if (row === data_rows.length - 1) {
                    data_passed = true;
                }
            }

            var markup = {
                'list': list_markup,
                'profile': profile_markup
            }

            return markup;
        };

        var writeData = function (markup, list_file, profile_file) {
            fs.writeFileSync(list_file, markup.list);
            console.log('written to ' + list_file);

            fs.writeFileSync(profile_file, markup.profile);
            console.log('written to ' + profile_file);
        };

        markup = readData(datasheet);
        if (data_passed) {
            writeData(markup, list_file, profile_file);
        } else {
            console.log('error occurred when reading data');
        }
    });
};