/*-
 * #%L
 * thinkbig-ui-feed-manager
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
angular.module(MODULE_FEED_MGR).factory('SlaService', function ($http, $q, $mdToast, $mdDialog, RestUrlService) {

    var data = {

        getPossibleSlaMetricOptions: function () {

            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http.get(RestUrlService.GET_POSSIBLE_SLA_METRIC_OPTIONS_URL);
            promise.then(successFn, errorFn);
            return promise;

        },

        validateSlaActionClass: function (actionClass) {
            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http.get(RestUrlService.VALIDATE_SLA_ACTION_URL, {params: {"actionConfigClass": actionClass}});
            promise.then(successFn, errorFn);
            return promise;

        },
        validateSlaActionRule: function (rule) {
            rule.validConfiguration = true;
            rule.validationMessage = '';
            var successFn = function (response) {
                if (response.data && response.data.length) {
                    var validationMessage = "";
                    _.each(response.data, function (validation) {
                        if (!validation.valid) {
                            if (validationMessage != "") {
                                validationMessage += ", ";
                            }
                            validationMessage += validation.validationMessage;
                        }
                    });
                    if (validationMessage != "") {
                        rule.validConfiguration = false;
                        rule.validationMessage = validationMessage;
                    }
                }
                ;

            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http.get(RestUrlService.VALIDATE_SLA_ACTION_URL, {params: {"actionConfigClass": rule.objectClassType}});
            promise.then(successFn, errorFn);
            return promise;

        },

        getPossibleSlaActionOptions: function () {

            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http.get(RestUrlService.GET_POSSIBLE_SLA_ACTION_OPTIONS_URL);
            promise.then(successFn, errorFn);
            return promise;

        },

        saveFeedSla: function (feedId, serviceLevelAgreement) {
            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http({
                url: RestUrlService.SAVE_FEED_SLA_URL(feedId),
                method: "POST",
                data: angular.toJson(serviceLevelAgreement),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(successFn, errorFn);
            return promise;

        },
        saveSla: function (serviceLevelAgreement) {
            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http({
                url: RestUrlService.SAVE_SLA_URL,
                method: "POST",
                data: angular.toJson(serviceLevelAgreement),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(successFn, errorFn);
            return promise;

        },
        deleteSla: function (slaId) {
            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http({
                url: RestUrlService.DELETE_SLA_URL(slaId),
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(successFn, errorFn);
            return promise;

        },
        getSlaForEditForm: function (slaId) {
            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http.get(RestUrlService.GET_SLA_AS_EDIT_FORM(slaId));
            promise.then(successFn, errorFn);
            return promise;

        },
        getFeedSlas: function (feedId) {
            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http.get(RestUrlService.GET_FEED_SLA_URL(feedId));
            promise.then(successFn, errorFn);
            return promise;

        },
        getAllSlas: function () {
            var successFn = function (response) {
                return response.data;
            }
            var errorFn = function (err) {
                console.log('ERROR ', err)
            }
            var promise = $http.get(RestUrlService.GET_SLAS_URL);
            promise.then(successFn, errorFn);
            return promise;

        },
        init: function () {

        }

    };
    data.init();
    return data;

});
