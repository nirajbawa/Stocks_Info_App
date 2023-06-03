
document.body.onload = () => {
    let dkmbtn = document.querySelector("#darkmodebtn");

    let flag = true;


    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("dark")
        dkmbtn.click()
        flag = false
        document.body.classList.add("dark")
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
       const theme = event.matches ? "dark" : "light";
       if(theme=="dark")
       {
        dkmbtn.click()
        flag = false
        document.body.classList.add("dark")
       }
       else{
        dkmbtn.click()
        flag = true
        document.body.classList.remove("dark")
       }
   });

    // defaultTheme()

    dkmbtn.addEventListener("click", (e) => {

        if (flag) {
            document.body.classList.add("dark")
            flag = false
            console.log("d" + flag)
        }
        else {
            document.body.classList.remove("dark")
            flag = true
            console.log("d" + flag)
        }
    })


     // reset table

     let resettable = () =>{
        let tloader = document.querySelector("#tloader")
        tloader.style.display = "none"
        datatable.innerHTML = "";
        let thead = `      <tr class="mb-10 ">
        <th class="w-[60px] py-1  font-normal tracking-wider text-gray-400 sm:text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] md:font-medium">#</th>
        <th class="w-[150px] py-1 font-normal tracking-wider text-gray-400 sm:text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] md:font-medium">Platform</th>
        <th class="w-[150px] py-1 font-normal tracking-wider text-gray-400 sm:text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] md:font-medium">Last Traded Price</th>
        <th class="w-[200px] py-1 font-normal tracking-wider text-gray-400 sm:text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] md:font-medium">Buy / Sell Price</th>
        <th class="w-[80px] py-1 font-normal tracking-wider text-gray-400 sm:text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] md:font-medium">Volume</th>
        <th class="w-[80px] py-1 font-normal tracking-wider text-gray-400 sm:text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] md:font-medium">Base Unit</th>
    </tr>
`
        datatable.insertAdjacentHTML("beforeend", thead)
    }


    // setting app table data and menu buttons data
    let data;
    let datatable = document.querySelector("#datatable")

    let i = 1;

    let fetchdata = async () => {
        try {
            let response = await fetch("/api/")
            console.log(response)
            data = await response.json()
            console.log(data)

            let mbtn1 = document.querySelector("#mbtn1");
            let btn1 = [];
            let mbtn2 = document.querySelector("#mbtn2");
            let btn2 = [];

            for (let ele of data) {
                if (!btn1.includes(ele.quote_unit)) {
                    btn1.push(ele.quote_unit)
                }
                if (!btn2.includes(ele.base_unit)) {
                    btn2.push(ele.base_unit)
                }
            }

            resettable();


            for (let ele of data) {

                let randomno = Math.floor((Math.random() * 5) + 1);
                let dataEle = ` 
                <tr class="bg-[#f8f9fa] rounded-xl dark:bg-[#2e3241] ">
                    <td style="border-radius: 10px 0px 0px 10px;" class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${i}</td>
                    <td class="flex justify-center items-center text-center content-center py-1 md:py-3 gap-2 text-[0.9rem]  sm:text-[1.1rem] lg:text-[1.5rem] font-medium"> <img src="/images/ic${randomno}.png" alt="icon" class="h-6 rounded-xl"> ${ele.name}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.last}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.buy} / ₹ ${ele.sell}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] ${ele.volume >= 0 ? 'text-[#5dc7c2]' : 'text-[#da5757]'} font-medium">${ele.volume}</td>
                    <td style="border-radius: 0px 10px 10px 0px;"  class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${ele.base_unit}</td>
                    </tr>
        `
                datatable.insertAdjacentHTML("beforeend", dataEle)

                i++;

            }

            for (let ele of btn1) {
                mbtn1.insertAdjacentHTML("beforeend", ` <option value="${ele}">${ele}</option>`)
            }

            for (let ele of btn2) {
                mbtn2.insertAdjacentHTML("beforeend", ` <option value="${ele}">${ele}</option>`)
            }
            console.log(btn1)
            console.log(btn2)

            setbtnevents();
        }
        catch (e) {
            console.log(e);
        }

    }

    fetchdata()


// menu btn events
    let setbtnevents = () => {
        let b1 = document.querySelector("#mbtn1")
        let b2 = document.querySelector("#mbtn2")
        
        b1.addEventListener("change", (e) => {
            console.log(e.target.value)
            i = 1;
            resettable();
            for (let ele of data) {

                if(e.target.value==ele.quote_unit)
                {

                let randomno = Math.floor((Math.random() * 5) + 1);
                let dataEle = ` 
                <tr class="bg-[#f8f9fa] rounded-xl dark:bg-[#2e3241] ">
                <td style="border-radius: 10px 0px 0px 10px;" class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${i}</td>
                <td class="flex justify-center items-center text-center content-center py-1 md:py-3 gap-2 text-[0.9rem]  sm:text-[1.1rem] lg:text-[1.5rem] font-medium"> <img src="/images/ic${randomno}.png" alt="icon" class="h-6 rounded-xl"> ${ele.name}</td>
                <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.last}</td>
                <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.buy} / ₹ ${ele.sell}</td>
                <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] ${ele.volume >= 0 ? 'text-[#5dc7c2]' : 'text-[#da5757]'} font-medium">${ele.volume}</td>
                <td style="border-radius: 0px 10px 10px 0px;"  class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${ele.base_unit}</td>
                </tr>
        `
                datatable.insertAdjacentHTML("beforeend", dataEle)

                i++;
                }
                else if(e.target.value=="All")
                {
                    let randomno = Math.floor((Math.random() * 5) + 1);
                    let dataEle = ` 
                    <tr class="bg-[#f8f9fa] rounded-xl dark:bg-[#2e3241] ">
                    <td style="border-radius: 10px 0px 0px 10px;" class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${i}</td>
                    <td class="flex justify-center items-center text-center content-center py-1 md:py-3 gap-2 text-[0.9rem]  sm:text-[1.1rem] lg:text-[1.5rem] font-medium"> <img src="/images/ic${randomno}.png" alt="icon" class="h-6 rounded-xl"> ${ele.name}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.last}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.buy} / ₹ ${ele.sell}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] ${ele.volume >= 0 ? 'text-[#5dc7c2]' : 'text-[#da5757]'} font-medium">${ele.volume}</td>
                    <td style="border-radius: 0px 10px 10px 0px;"  class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${ele.base_unit}</td>
                    </tr>
            `
                    datatable.insertAdjacentHTML("beforeend", dataEle)
    
                    i++;
                }

            }
        })

        
        b2.addEventListener("change", (e) => {
           console.log(e.target.value)
            i = 1;
            resettable();
            for (let ele of data) {

                if(e.target.value==ele.base_unit)
                {

                let randomno = Math.floor((Math.random() * 5) + 1);
                let dataEle = ` 
                <tr class="bg-[#f8f9fa] rounded-xl dark:bg-[#2e3241] ">
                <td style="border-radius: 10px 0px 0px 10px;" class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${i}</td>
                <td class="flex justify-center items-center text-center content-center py-1 md:py-3 gap-2 text-[0.9rem]  sm:text-[1.1rem] lg:text-[1.5rem] font-medium"> <img src="/images/ic${randomno}.png" alt="icon" class="h-6 rounded-xl"> ${ele.name}</td>
                <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.last}</td>
                <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.buy} / ₹ ${ele.sell}</td>
                <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] ${ele.volume >= 0 ? 'text-[#5dc7c2]' : 'text-[#da5757]'} font-medium">${ele.volume}</td>
                <td style="border-radius: 0px 10px 10px 0px;"  class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${ele.base_unit}</td>
                </tr>
        `
                datatable.insertAdjacentHTML("beforeend", dataEle)

                i++;
                }
                else if(e.target.value=="All")
                {
                    let randomno = Math.floor((Math.random() * 5) + 1);
                    let dataEle = ` 
                    <tr class="bg-[#f8f9fa] rounded-xl dark:bg-[#2e3241] ">
                    <td style="border-radius: 10px 0px 0px 10px;" class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${i}</td>
                    <td class="flex justify-center items-center text-center content-center py-1 md:py-3 gap-2 text-[0.9rem]  sm:text-[1.1rem] lg:text-[1.5rem] font-medium"> <img src="/images/ic${randomno}.png" alt="icon" class="h-6 rounded-xl"> ${ele.name}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.last}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">₹ ${ele.buy} / ₹ ${ele.sell}</td>
                    <td class="py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] ${ele.volume >= 0 ? 'text-[#5dc7c2]' : 'text-[#da5757]'} font-medium">${ele.volume}</td>
                    <td style="border-radius: 0px 10px 10px 0px;"  class=" py-1 md:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.5rem] font-medium">${ele.base_unit}</td>
                    </tr>
            `
                    datatable.insertAdjacentHTML("beforeend", dataEle)
    
                    i++;
                }

            }
        })
    }



   
   





    // timer spinner animation

    let timerani = () => {
        let i = 00
        let spinner = document.querySelector("#spinner");
        setInterval(() => {
            if (i == 60) {
                i = 00
            }
            if (i < 9) {
                spinner.innerHTML = '0' + i
            }
            else {
                spinner.innerHTML = i
            }

            i++
        }, 1000);
    }

    timerani()

}

