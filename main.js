"use strict"
var request = require('request');
var cheerio = require('cheerio');

let events = [
    {
        url: 'https://www.shohoz.com/events/bangladesh-vs-england-series-2016/book-now/2016-10-07',
        ticketName: 'First OneDay Ticket',
        check: false,
        selector: '#ticket_type',
        cats: [
            'Eastern Stand - Tk. 100 (Sold Out)',
            'Southern Stand - Tk. 150 (Sold Out)',
            'Northern Stand - Tk. 150 (Sold Out)',
            'Shahid Mushtaque Stand - Tk. 300 (Sold Out)',
            'Shahid Jewel Stand - Tk. 300 (Sold Out)',
            'VIP Stand - Tk. 500 (Sold Out)',
            'Grand Stand - Tk. 2000 (Sold Out)'
        ]
    },
    {
        url: 'https://www.shohoz.com/events/bangladesh-vs-england-series-2016/book-now/2016-10-09',
        ticketName: 'Second OneDay Ticket',
        check: false,
        selector: '#ticket_type',
        cats: [
            'Eastern Stand - Tk. 100 (Sold Out)',
            'Southern Stand - Tk. 150 (Sold Out)',
            'Northern Stand - Tk. 150 (Sold Out)',
            'Shahid Mushtaque Stand - Tk. 300 (Sold Out)',
            'Shahid Jewel Stand - Tk. 300 (Sold Out)',
            'VIP Stand - Tk. 500 (Sold Out)',
            'Grand Stand - Tk. 2000 (Sold Out)'
        ]
    },
    {
        url: 'https://www.shohoz.com/events/bangladesh-vs-england-series-2016/book-now/2016-10-24',
        ticketName: 'CTG Test Day 5',
        check: true,
        selector: '#ticket_type',
        cats: [
            'Eastern Stand - Tk. 50 (Sold Out)',
            'Western Stand - Tk. 80 (Sold Out)',
            'Club House East - Tk. 200 (Sold Out)',
            'Club House West - Tk. 200 (Sold Out)',
            'International Stand - Tk. 300 (Sold Out)',
            'Grand Stand - Tk. 500 (Sold Out)',
            'Roof Top Hospitality - Tk. 500 (Sold Out)'
        ]
    }
];

setInterval(function () {
    events.map(function (event) {
        if (event.check) {
            request(event.url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let $ = cheerio.load(body);
                    let dropdown = $(event.selector).text();
                    // console.log(dropdown);
                    if (dropdown.length > 10) {
                        event.cats.map(function (cat) {
                            if (dropdown.indexOf(cat) > 0) {
                                // showNotif(event.ticketName, 'Not Available!');
                            }
                            else {
                                showNotif(event.ticketName, 'Available!');
                            }
                        });
                    }
                    else {
                        // showNotif(event.ticketName, 'Not Available!');
                    }
                }
            });
        }
    });

}, 10000);

function showNotif(message, title) {
    let notification_command = 'display notification "' + message + '" sound name "Basso" with title "' + title + '"';
    let spawn = require('child_process').spawn;
    spawn('osascript', ['-e', notification_command]);
}
