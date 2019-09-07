var Conference = Conference || {};

Conference.checkInService = function(checkInRecorder) {
  'use strict';

  // 주입한 checkInRecorder의 참조값을 보관한다
  var recorder = checkInRecorder;

  return {
    checkIn: function(attendee) {
      return new Promise(function checkInPromise(resolve, reject) {
        attendee.checkIn();
        return recorder.recordCheckIn(attendee).then(
          // 성공
          function onRecordCheckInSucceeded(checkInNumber) {
            attendee.setCheckInNumber(checkInNumber);
            return resolve(checkInNumber);
          },
          // 실패
          function onRecordCheckInFailed(reason) {
            attendee.undoCheckIn();
            return reject(reason);
          }
        );
      });
    }
  };
};

