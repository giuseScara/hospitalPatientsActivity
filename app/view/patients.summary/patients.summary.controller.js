var jsonData = [
  {
    name: 'www.site1.com',
    upload: 200
  },
  {
    name: 'www.site2.com',
    upload: 100
  },
  {
    name: 'www.site3.com',
    upload: 300
  },
  {
    name: 'www.site4.com',
    upload: 400
  }
]

var data = {};
var sites = [];
jsonData.forEach(function (e) {
  sites.push(e.name);
  data[e.name] = e.upload;
})

chart = c3.generate({
  data: {
    json: [data],
    keys: {
      value: sites,
    },
    type: 'bar'
  },
});
