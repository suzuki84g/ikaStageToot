const IkaStage = require('./ikaStage')
const ikaStage = new IkaStage ([
  {
    fromTime: '19:00',
    index:4
  },
  {
    fromTime: '21:00',
    index:5
  },
  {
    fromTime: '23:00',
    index:6
  },
])
ikaStage.execute()
