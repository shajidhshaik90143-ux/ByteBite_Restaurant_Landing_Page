let plans=JSON.parse(localStorage.getItem("studyPlans"))||[];
let currentDate=null;

const form=document.getElementById("planForm");
const output=document.getElementById("planOutput");
const countdown=document.getElementById("countdown");

form.addEventListener("submit",function(e){
  e.preventDefault();

    let name=document.getElementById("examName").value;
      let date=document.getElementById("examDate").value;
        let topics=document.getElementById("topics").value
            .split(",").map(x=>x.trim()).filter(x=>x);
              let subs=document.getElementById("subtopics").value;
                let hours=Number(document.getElementById("hours").value)||0;
                  let mins=Number(document.getElementById("minutes").value)||0;

                    let plan={
                        id:Date.now(),
                            name:name,
                                date:date,
                                    topics:topics,
                                        subs:subs,
                                            time:hours+"h "+mins+"m"
                                              };

                                                plans.push(plan);
                                                  localStorage.setItem("studyPlans",JSON.stringify(plans));
                                                    currentDate=date;

                                                      showPlan(plan);
                                                        startCountdown();
                                                          form.reset();
                                                          });

                                                          function showPlan(p){
                                                            output.innerHTML=`
                                                              <div class="plan">
                                                                <h3>${p.name}</h3>
                                                                  <p><b>Exam Date:</b> ${p.date}</p>
                                                                    <p><b>Topics:</b> ${p.topics.join(", ")}</p>
                                                                      <p><b>Sub-topics:</b> ${p.subs||"Not specified"}</p>
                                                                        <p><b>Study Time:</b> ${p.time} per topic</p>
                                                                          <hr>
                                                                            <h4>Study Flow</h4>
                                                                              ${p.topics.map((t,i)=>
                                                                                  `<p>${i+1}. ${t} → Study → Revise → Practice</p>`
                                                                                    ).join("")}
                                                                                      </div>`;
                                                                                      }

                                                                                      function startCountdown(){
                                                                                        clearInterval(window.timer);

                                                                                          window.timer=setInterval(()=>{
                                                                                              if(!currentDate)return;

                                                                                                  let target=new Date(currentDate+"T23:59:59");
                                                                                                      let now=new Date();
                                                                                                          let diff=target-now;

                                                                                                              if(diff<=0){
                                                                                                                    countdown.innerHTML="🎯 Exam Day!";
                                                                                                                          clearInterval(window.timer);
                                                                                                                                return;
                                                                                                                                    }

                                                                                                                                        let days=Math.floor(diff/86400000);
                                                                                                                                            let hours=Math.floor(diff/3600000)%24;
                                                                                                                                                let mins=Math.floor(diff/60000)%60;
                                                                                                                                                    let secs=Math.floor(diff/1000)%60;

                                                                                                                                                        countdown.innerHTML=
                                                                                                                                                              `${days} Days ${hours} Hours ${mins} Minutes ${secs} Seconds`;
                                                                                                                                                                },1000);
                                                                                                                                                                }

                                                                                                                                                                document.getElementById("showPlans").onclick=function(){
                                                                                                                                                                  let box=document.getElementById("previous");

                                                                                                                                                                    if(!plans.length){
                                                                                                                                                                        box.innerHTML="<p>No previous plans found.</p>";
                                                                                                                                                                            return;
                                                                                                                                                                              }

                                                                                                                                                                                box.innerHTML=plans.map(p=>`
                                                                                                                                                                                    <div class="previous">
                                                                                                                                                                                          <h3>${p.name}</h3>
                                                                                                                                                                                                <p>📅 ${p.date}</p>
                                                                                                                                                                                                      <p>📚 ${p.topics.join(", ")}</p>
                                                                                                                                                                                                            <button onclick="loadPlan(${p.id})">View Plan</button>
                                                                                                                                                                                                                  <button class="delete" onclick="deletePlan(${p.id})">
                                                                                                                                                                                                                          Delete
                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                      `).join("");
                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                      function loadPlan(id){
                                                                                                                                                                                                                                        let p=plans.find(x=>x.id===id);
                                                                                                                                                                                                                                          if(p){
                                                                                                                                                                                                                                              currentDate=p.date;
                                                                                                                                                                                                                                                  showPlan(p);
                                                                                                                                                                                                                                                      startCountdown();
                                                                                                                                                                                                                                                          window.scrollTo({top:0,behavior:"smooth"});
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                            function deletePlan(id){
                                                                                                                                                                                                                                                              if(!confirm("Delete this study plan?"))return;

                                                                                                                                                                                                                                                                plans=plans.filter(p=>p.id!==id);
                                                                                                                                                                                                                                                                  localStorage.setItem("studyPlans",JSON.stringify(plans));
                                                                                                                                                                                                                                                                    document.getElementById("showPlans").click();
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                    if(plans.length){
                                                                                                                                                                                                                                                                      currentDate=plans[plans.length-1].date;
                                                                                                                                                                                                                                                                        showPlan(plans[plans.length-1]);
                                                                                                                                                                                                                                                                          startCountdown();
                                                                                                                                                                                                                                                                          }