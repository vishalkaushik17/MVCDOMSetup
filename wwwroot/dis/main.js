const currentUrl = `${window.location.protocol}//${window.location.host}`;

//put first if need to pass as param in another iife function
const JSApiService = function () {
    const GetAPIDataAsJso = function (currentUrl, path, RenderViewAsHtmlString, PrintError) {
        /*debugger;*/
        fetch(`${currentUrl}${path}`, {
            method: 'GET',
            headers: ApiHeaders
        })
            .then(JsonResponse).then(RenderViewAsHtmlString).catch(PrintError);
    };
    const ApiHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const JsonResponse = async (response) => {
        debugger;
        return await response.json();
    };
    const TextResponse = async (response) => {
        debugger;
        return await response.text();
    };
    return {
        GetAPIData: GetAPIData
    }
}();
const jsLayoutPageComponent = function (jsApiService) {
    debugger;
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
                debugger;
                jsApiService.GetAPIData(currentUrl, lastPath, RenderViewAsHtmlString, PrintError);
            }
        }
    };
    
    //fetch view from respective action method and render on html page.
    const RenderViewAsHtmlString = (result) => {
        /*debugger;*/
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
        /*debugger;*/
        
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
}(JSApiService);
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

jsLayoutPageComponent.FindSPANavigationLinks();
//const clickButton = document.getElementById('indexClickButton');
//jsHomeControllerComponent.AddClickEventOnButton(clickButton);
