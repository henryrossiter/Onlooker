from datetime import datetime, timedelta
import time
import sortTweets

while 1:
    print('updated at: ')
    print(datetime.now())
    sortTweets.runUpdate()

    dt = datetime.now() + timedelta(hours=1)
    dt = dt.replace(minute=45)
    print('Next Update scheduled for: {}'.format(dt))

    while datetime.now() < dt:
        time.sleep(1)
