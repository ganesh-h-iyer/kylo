/*-
 * #%L
 * thinkbig-ui-operations-manager
 * %%
 * Copyright (C) 2017 ThinkBig Analytics
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
angular.module(MODULE_OPERATIONS).service('AlertsService',function() {

var self = this;
    this.feedFailureAlerts = {};
    this.serviceAlerts = {};
    this.alerts = [];
    this.alertsById  = {};
    this.findFeedFailureAlert= function(feedName) {
       return _.find(self.alerts,function(alert) {
            return alert.type == 'Feed' && alert.name == feedName;
        });
    }

    this.findFeedFailureAlertIndex= function(feedName) {
      return  _.findIndex(self.alerts,function(alert) {
            return alert.type == 'Feed' && alert.name == feedName;
        });
    }

    this.replaceFeedAlert = function(feedName, feedHealth) {

    }


    this.addFeedHealthFailureAlert = function(feedHealth){
        //first remove it and add a new entry
        if(self.feedFailureAlerts[feedHealth.feed] != undefined) {
            self.removeFeedFailureAlertByName(feedHealth.feed);
        }
            var alertId = IDGenerator.generateId('alert');
            var alert = {id:alertId,type:'Feed',name:feedHealth.feed,'summary':feedHealth.feed, message:'UNHEALTHY',severity:'FATAL',sinceTime:feedHealth.lastUnhealthyTime, count:feedHealth.unhealthyCount,since:feedHealth.sinceTimeString};
            self.feedFailureAlerts[feedHealth.feed] = alert;
            self.alertsById[alertId] =alert;
            self.alerts.push(alert);

    }

    this.addServiceAlert = function(service){
            if(self.serviceAlerts[service.serviceName] == undefined) {
                var alertId = IDGenerator.generateId('service');

                var alert = {id:alertId,type:'Service',name:service.serviceName,'summary':service.serviceName, message:service.alertsCount+" alerts",severity:'FATAL',count:1,sinceTime:service.latestAlertTimestamp, since:new moment(service.latestAlertTimestamp).fromNow()};
                self.serviceAlerts[service.serviceName] = alert;
                self.alertsById[alertId] =alert;
                self.alerts.push(alert);
            }
            else {
                self.serviceAlerts[service.serviceName].sinceTime = service.latestAlertTimestamp;
                self.serviceAlerts[service.serviceName].since = new moment(service.latestAlertTimestamp).fromNow();
            }
        }


    this.removeFeedFailureAlertByName  = function(feed){
        var alert = self.feedFailureAlerts[feed];
        if(alert) {
            delete self.feedFailureAlerts[feed];
            delete self.alertsById[alert.id];
            var matchingIndex = self.findFeedFailureAlertIndex(feed);
            if(matchingIndex != -1) {
                self.alerts.splice(matchingIndex,1);
            }
        }
    }

    this.removeServiceAlert  = function(service){
        var alert = self.serviceAlerts[service.serviceName];
        if(alert) {
            delete self.serviceAlerts[service.serviceName];
            delete self.alertsById[alert.id];
            var index = self.alerts.indexOf(alert);
            self.alerts.splice(index,1);
        }
    }




});
