const IkaStage = require('./ikaStage')
const ikaStage = new IkaStage ([
  {
    fromTime: '19:00',
    index:6
  },
  {
    fromTime: '21:00',
    index:7
  },
  {
    fromTime: '23:00',
    index:8
  },
])
ikaStage.execute()
