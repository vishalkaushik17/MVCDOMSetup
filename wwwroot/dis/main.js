const currentUrl = `${window.location.protocol}//${window.location.host}`;
const jsLayoutPageComponent = function () {

    //Find page navigation links and register event listener to link element
    const FindSPANavigationLinks = function () {
        const navLinkElements = Array.from(document.querySelectorAll('a')).filter(element => {
            return element.hasAttribute('Partial-Nav-Link');
        });
        navLinkElements.forEach(e => {
            e.addEventListener('click', GenerateNavigationLink.bind(this))
        });
    };

    //Generate navigation link for SPA operation.
    const GenerateNavigationLink = function (event) {
        const link = event.currentTarget.href;
        const indexValue = link.indexOf('#') + 1;
        if (indexValue > 0) {
            const lastPath = link.substring(indexValue);
            if (lastPath.length > 0) {
                RenderView(lastPath);
            }

        }
    };
    //function (path) {
    //    const rawResponse = await fetch(`${currentUrl}${path}`, {
    //        method: 'GET',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        }
    //    });
    //    const content = await rawResponse.json();

    //    console.log(content);
    //};
    //fetch view from respective action method and render on html page.
    const RenderView = function (path) {
        debugger;
        const rawResponse = fetch(`${currentUrl}${path}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(JsonResponse).then(RenderViewAsHtmlString).catch(PrintError);
    };
    const JsonResponse = (response) => {
        return response.json();
    }
    const TextResponse = (response) => {
        return response.text();
    }
    const RenderViewAsHtmlString = (result) => {
        debugger;
        console.log(result);
        const partialId = document.getElementById('partial');
        if (result.status === true) {
            partialId.innerHTML = result.htmlResponse;
            PrintSuccess(result);
            return;
        }
        PrintError(result);
        return;
    }

    const PrintError = (error) => {
        debugger;
        FancyAlerts.show.show({ msg: 'Uh oh something went wrong!', type: 'error' })
        swal({
            title: "Error!",
            text: error.message,
            icon: "warning",
            buttons: false,
            type: "warning",
            timer: 4000
        });
        console.log(error);
    }
    const PrintSuccess = (success) => {
        if (success.showMessage) {
            swal({
                title: "Success!",
                text: success.message,
                icon: "success",
                buttons: false,
                type: "success",
                timer: 4000
            });
        }
    }

    return {
        FindSPANavigationLinks: FindSPANavigationLinks
    }
}();
const jsHomeControllerComponent = function () {
   
    const AddClickEventHandlerOnClickButton = function (element) {
        if (element) {
            element.addEventListener('click', clickOnTest);
        }
    };

    const clickOnTest = function () {
        fetch(`${currentUrl}/home/test`).then(data => {
            if (data) {
                return data.text();
            }
        }).then(result => {
            if (result) {
                const partialId = document.getElementById('partial');
                if (partialId) {
                    partialId.innerHTML = result;
                    const btnEmployee = document.getElementById('btnEmployee');
                    const btnClear = document.getElementById('btnClear');
                    if (btnEmployee) {
                        RegisterClickEventOnTheFly(btnEmployee);
                        RegisterClickEventOnTheFlyForClear(btnClear);
                    }

                } else {
                    console.log('div not available for rendering!!!')
                }
            }
        })
    };
    const RegisterClickEventOnTheFlyForClear = function (btnClear) {
        btnClear.addEventListener('click', ClearField);
    };
    const RegisterClickEventOnTheFly = function (btnEmployee) {
        btnEmployee.addEventListener('click', RenderEmployeeDataOnFly);
    };
    const ClearField = function () {

            const elementId = document.getElementById('EmployeeName');
            if (elementId) {
                elementId.innerHTML = '';
                document.getElementById('empTitle').style.display = 'none';
            }
    };
    const RenderEmployeeDataOnFly = function () {
        const element = document.getElementById('EmpDataHiddenField');
        
        if (element) {
            const elementValue = element.getAttribute('EmpAttr');
            if (elementValue && elementValue !== '') {
                const jObject = JSON.parse(elementValue);
                element.setAttribute('EmpAttr', '');
                const elementId = document.getElementById('EmployeeName');

                if (element) {
                    elementId.innerHTML = jObject.Id + ' ' + jObject.Name;
                }

            }
        }
    };
    return {
        ClickOnTest: clickOnTest,
        AddClickEventOnButton: AddClickEventHandlerOnClickButton,
    }
}();

//************************* */
//let FancyAlerts = (function () {

//    const self = this;
//    console.log(self);
//    self.show = function (options) {
//        if (document.getElementsByClassName('.fancy-alert').length > -1) {
//            FancyAlerts.hide();
//        }
//        const defaults = {
//            type: 'success',
//            msg: 'Success',
//            timeout: 5000,
//            icon: 'fa fa-check',
//            onClose: function () { }
//        };

//        if (options.type === 'error' && !options.icon) options.icon = 'fa fa-exclamation-triangle';
//        if (options.type === 'info' && !options.icon) options.icon = 'fa fa-cog';


//        options = { ...defaults, ...options };
//        var alert = ('<div class="fancy-alert ' + options.type + ' ">' +
//            '<div class="">' +
//            '<i class="fancy-alert--icon ' + options.icon + '"></i>' +
//            '<div class="fancy-alert--content">' +
//            '<div class="fancy-alert--words">' + options.msg + '</div>' +
//            '<a class="fancy-alert--close" href="#"><i class="fa fa-times"></i></a>' +
//            '</div>' +
//            '</div>' +
//            '</div>');

//        document.getElementsByTagName('partial').prepend(alert);
//        setTimeout(function () {

//            alert.addClass('fancy-alert__active');
//        }, 10);

//        setTimeout(function () {
//            alert.addClass('fancy-alert__extended');
//        }, 500);

//        if (options.timeout) {
//            self.hide(options.timeout);
//        }
//        $('.fancy-alert--close').on('click', function (e) {
//            e.preventDefault();
//            self.hide();
//        });

//        alert.on('fancyAlertClosed', function () {
//            options.onClose();
//        });
//    };


//    self.hide = function (_delay) {
//        var delay = _delay || 0;

//        var alert = document.getElementsByClassName('.fancy-alert');
//        setTimeout(function () {
//            setTimeout(function () {
//                alert.removeClass("fancy-alert__extended");
//            }, 10);

//            setTimeout(function () {
//                alert.removeClass('fancy-alert__active');
//            }, 500);
//            setTimeout(function () {
//                alert.trigger('fancyAlertClosed');
//                alert.remove();
//            }, 1000);
//        }, delay);
//    }

//    return { self: self, FancyAlerts: FancyAlerts };

//})();
$(function () {
    $('.show-alert__error').click(function () {
        FancyAlerts.show({ msg: 'Uh oh something went wrong!', type: 'error' })
    })
    $('.show-alert__success').click(function () {
        FancyAlerts.show({ msg: 'Nailed it! This totally worked.' })
    })
    $('.show-alert__info').click(function () {
        FancyAlerts.show({ msg: 'So long and thanks for all the shoes.', type: 'info' })
    });
})

 
var FancyAlerts = (function () {

    var self = this;

    self.show = function (options) {
        if ($('.fancy-alert').length > -1) {
            FancyAlerts.hide();
        }
        var defaults = {
            type: 'success',
            msg: 'Success',
            timeout: 5000,
            icon: 'fa fa-check',
            onClose: function () { }
        };

        if (options.type === 'error' && !options.icon) options.icon = 'fa fa-exclamation-triangle';
        if (options.type === 'info' && !options.icon) options.icon = 'fa fa-cog';

        var options = $.extend(defaults, options);

        var $alert = $('<div class="fancy-alert ' + options.type + ' ">' +
            '<div class="">' +
            '<i class="fancy-alert--icon ' + options.icon + '"></i>' +
            '<div class="fancy-alert--content">' +
            '<div class="fancy-alert--words">' + options.msg + '</div>' +
            '<a class="fancy-alert--close" href="#"><i class="fa fa-times"></i></a>' +
            '</div>' +
            '</div>' +
            '</div>');

        $('body').prepend($alert);
        setTimeout(function () {
            $alert.addClass('fancy-alert__active');
        }, 10);

        setTimeout(function () {
            $alert.addClass('fancy-alert__extended');
        }, 500);

        if (options.timeout) {
            self.hide(options.timeout);
        }
        $('.fancy-alert--close').on('click', function (e) {
            e.preventDefault();
            self.hide();
        });

        $alert.on('fancyAlertClosed', function () {
            options.onClose();
        });
    };


    self.hide = function (_delay) {
        var delay = _delay || 0;

        var $alert = $('.fancy-alert');
        setTimeout(function () {
            setTimeout(function () {
                $alert.removeClass("fancy-alert__extended");
            }, 10);

            setTimeout(function () {
                $alert.removeClass('fancy-alert__active');
            }, 500);
            setTimeout(function () {
                $alert.trigger('fancyAlertClosed');
                $alert.remove();
            }, 1000);
        }, delay);
    }

    return self;

})();

//************************* */

jsLayoutPageComponent.FindSPANavigationLinks();
const clickButton = document.getElementById('indexClickButton');
jsHomeControllerComponent.AddClickEventOnButton(clickButton);
