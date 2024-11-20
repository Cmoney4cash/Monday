

function searchJobs() {
    var input = document.getElementById("jobTitle").value;
    var inputLocale = document.getElementById("location").value

    //taking input from user to search with api and collect data from the
    // api database
    fetch(`http://api.lmiforall.org.uk/api/v1/vacancies/search?location=${inputLocale}&keywords=${input}`)
    .then(
        response => response.ok ? response.json() : Promise.reject("Failed to fetch information")
    )
    .then(
        data =>{
            document.getElementById("results").innerText = '\n'+'\n'

            //looping through the array gotten from the API
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                
                document.getElementById("results").innerText += '\n'+'\n'
                +'\n' + "Title: " + element.title
                +'\n'+'\n'+'\n' + "Summary: " + element.summary
                +'\n'+'\n' + "Company: " + element.company
                +'\n'+'\n' + "Start time: " + element.activedate.start
                +'\n'+'\n' + "End time: " + element.activedate.end
                +'\n'+'\n' + "Location: " + element.location.location
                +'\n'+'\n' + "Job Link: " + element.link
            }

        }
    ).catch(() => {
          document.querySelector("#results").innerHTML = "Sorry, could not get information try again"
    })
}


function recent(){
    //taking input from user to search with api and collect data from the
    // api database
    
    fetch(`http://api.lmiforall.org.uk/api/v1/vacancies/search?location=&keywords=`)
    .then(
        response => response.ok ? response.json() : Promise.reject("Failed to fetch information")
    )
    .then(
        data =>{

            //looping through the array gotten from the API
            for (let index = 0; index < 5; index++) {
                const element = data[index];
                
                document.getElementById("results").innerText += '\n'+'\n'
                +'\n' + "Title: " + element.title
                +'\n'+'\n' + "Summary: " + element.summary
                +'\n'+'\n' + "Company: " + element.company
                +'\n'+'\n' + "Location: " + element.location.location
                +'\n'+'\n' + "Job Link: " + element.link
            }


        }
    ).catch(() => {
          document.querySelector("#results").innerHTML = "Sorry, could not get information try again"
    })
}