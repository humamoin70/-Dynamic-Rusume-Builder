declare const html2pdf:any;


const form = document.getElementById("resumeform") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumephone = document.getElementById("resumePhone") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumeEducation = document.getElementById("resumEducation") as HTMLParagraphElement;
const resumeworkexperience = document.getElementById("workexperience") as HTMLParagraphElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement;
const dowloadpdfButton = document.getElementById("dowload-pdf") as HTMLButtonElement;
const backButton = document.getElementById("backButton") as HTMLButtonElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;
const resumeContent= document.getElementById("resumeContent") as HTMLDivElement;
const sharelinkButton = document.getElementById("sharelinkButton") as HTMLButtonElement;
const resumephoto = document.getElementById("resumePhoto") as HTMLImageElement;


form.addEventListener("submit", async(event:Event)=>{
event.preventDefault()


const name1 = (document.getElementById("name") as HTMLInputElement).value;
const email = (document.getElementById("email") as HTMLInputElement).value;
const phone = (document.getElementById("phone") as HTMLInputElement).value;
const degree = (document.getElementById("degree") as HTMLInputElement).value;
const education = (document.getElementById("education") as HTMLInputElement).value;
const WorkExperience = (document.getElementById("workexperience") as HTMLTextAreaElement).value;
const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
const photoinput = document.getElementById("photo") as HTMLInputElement;

const photofile = photoinput.files?  photoinput.files[0]:null;

let photoBase64 = "";

if(photofile){
    photoBase64 = await fileToBase64(photofile);

    localStorage.setItem("resumePhoto" ,photoBase64 )
    resumephoto.src = photoBase64;

}

document.querySelector("container")?.classList.add("hidden");
resumePage.classList.remove("hidden");

resumeName.textContent=name1;
resumeEmail.textContent= `Email : ${email}`;
resumephone.textContent= `phone : ${phone}`;
resumeEducation.textContent =`${degree} from ${education}`;
resumeworkexperience .textContent  = WorkExperience;
resumeSkills.textContent = skills;



const queryParams = new URLSearchParams({
  name:name1,
  email:email,
  phone:phone,
  degree:degree,
  education:education,
  workexperience:WorkExperience,
  skills:skills,

})
const uniqeUrl = `${window.location.origin}? ${queryParams.toString()}`
sharelinkButton.addEventListener("click" ,()=>{
  navigator.clipboard.writeText(uniqeUrl);
  alert("the link is copied")
})
window.history.replaceState(null, '', `${queryParams.toString()}`);

});

function fileToBase64(file:File):Promise<string>{
return new Promise((resolve,reject) =>{
    const reader = new FileReader();

    reader.onloadend=()=>resolve(
      reader.result as string 
    )

reader.onerror = reject;
reader.readAsDataURL(file);
   

});
}
editButton.addEventListener("click",()=>{
  updateFormfromResume();

  document.querySelector(".container")?.classList.remove("hidden");
  resumePage.classList.add("hidden");
  })
  function updateFormfromResume(){

     const [degree, education] = resumeEducation.textContent?.split("from") || '';
     (document.getElementById("name")as HTMLInputElement).value =resumeName.textContent || '';
     (document.getElementById("email") as HTMLInputElement).value=resumeEmail.textContent?.replace(`Email:`,'') || '';
     (document.getElementById("phone") as HTMLInputElement).value=resumephone.textContent?.replace(`phone:`,'') || '';
     (document.getElementById("degree")as HTMLInputElement).value =degree || '';
     (document.getElementById("education")as HTMLInputElement).value = education|| '';
     (document.getElementById("workexperience") as HTMLInputElement).value=resumeworkexperience.textContent?.replace(`:`,'') || '';
     (document.getElementById("skills") as HTMLInputElement).value=resumeSkills.textContent?.replace(`:`,'') || '';
  }
  dowloadpdfButton.addEventListener("click",()=>{
    if(typeof html2pdf === 'undefined'){
      alert('Error : htnl2pdf libarary is not loaded')
      return;
  }
  const resumeOptions = {
    margin:0.5,
    filename:'resume.pdf',
    image:{typ:"jpeg" , quality:1.0},
    html2canvas:{scale:2},
    jsPDF:{unit:"in",format:"letter",orientation:"potrait"}

  };
  html2pdf()
        .from(resumeContent)
        .set(resumeOptions)
        .save()
        .catch((error: Error) => {
            console.error('PDF generation error', error);
        });
});


window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const phone = params.get('phone') || '';
    const degree = params.get('degree') || '';
    const education = params.get('education') || '';
    const workExperience = params.get('workExperience') || '';
    const skills = params.get('skills') || '';

    if (name || email || phone || degree || education || workExperience || skills) {
        
        resumeName.textContent = name;
        resumeEmail.textContent = `Email: ${email}`;
        resumephone.textContent = `Phone: ${phone}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeworkexperience.textContent = workExperience;
        resumeSkills.textContent = skills;

        
        const savedPhoto = localStorage.getItem("resumePhoto");
        if (savedPhoto) {
            resumephoto.src = savedPhoto;
        }

        
        document.querySelector(".container")?.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});


resumephoto.style.width = "150px";  
resumephoto.style.height = "150px";
resumephoto.style.objectFit = "cover";
resumephoto.style.borderRadius = "50%";  
resumephoto.style.display = "block";
resumephoto.style.margin = "0 auto";