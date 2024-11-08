"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeform");
const resumePage = document.getElementById("resumePage");
const resumephone = document.getElementById("resumePhone");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumeEducation = document.getElementById("resumEducation");
const resumeworkexperience = document.getElementById("workexperience");
const resumeSkills = document.getElementById("resumeSkills");
const dowloadpdfButton = document.getElementById("dowload-pdf");
const backButton = document.getElementById("backButton");
const editButton = document.getElementById("editButton");
const resumeContent = document.getElementById("resumeContent");
const sharelinkButton = document.getElementById("sharelinkButton");
const resumephoto = document.getElementById("resumePhoto");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const name1 = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const degree = document.getElementById("degree").value;
    const education = document.getElementById("education").value;
    const WorkExperience = document.getElementById("workexperience").value;
    const skills = document.getElementById("skills").value;
    const photoinput = document.getElementById("photo");
    const photofile = photoinput.files ? photoinput.files[0] : null;
    let photoBase64 = "";
    if (photofile) {
        photoBase64 = yield fileToBase64(photofile);
        localStorage.setItem("resumePhoto", photoBase64);
        resumephoto.src = photoBase64;
    }
    (_a = document.querySelector("container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumePage.classList.remove("hidden");
    resumeName.textContent = name1;
    resumeEmail.textContent = `Email : ${email}`;
    resumephone.textContent = `phone : ${phone}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeworkexperience.textContent = WorkExperience;
    resumeSkills.textContent = skills;
    const queryParams = new URLSearchParams({
        name: name1,
        email: email,
        phone: phone,
        degree: degree,
        education: education,
        workexperience: WorkExperience,
        skills: skills,
    });
    const uniqeUrl = `${window.location.origin}? ${queryParams.toString()}`;
    sharelinkButton.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqeUrl);
        alert("the link is copied");
    });
    window.history.replaceState(null, '', `${queryParams.toString()}`);
}));
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
editButton.addEventListener("click", () => {
    var _a;
    updateFormfromResume();
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
function updateFormfromResume() {
    var _a, _b, _c, _d, _e;
    const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split("from")) || '';
    document.getElementById("name").value = resumeName.textContent || '';
    document.getElementById("email").value = ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace(`Email:`, '')) || '';
    document.getElementById("phone").value = ((_c = resumephone.textContent) === null || _c === void 0 ? void 0 : _c.replace(`phone:`, '')) || '';
    document.getElementById("degree").value = degree || '';
    document.getElementById("education").value = education || '';
    document.getElementById("workexperience").value = ((_d = resumeworkexperience.textContent) === null || _d === void 0 ? void 0 : _d.replace(`:`, '')) || '';
    document.getElementById("skills").value = ((_e = resumeSkills.textContent) === null || _e === void 0 ? void 0 : _e.replace(`:`, '')) || '';
}
dowloadpdfButton.addEventListener("click", () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error : htnl2pdf libarary is not loaded');
        return;
    }
    const resumeOptions = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { typ: "jpeg", quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "potrait" }
    };
    html2pdf()
        .from(resumeContent)
        .set(resumeOptions)
        .save()
        .catch((error) => {
        console.error('PDF generation error', error);
    });
});
window.addEventListener('DOMContentLoaded', () => {
    var _a;
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
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});
resumephoto.style.width = "150px";
resumephoto.style.height = "150px";
resumephoto.style.objectFit = "cover";
resumephoto.style.borderRadius = "50%";
resumephoto.style.display = "block";
resumephoto.style.margin = "0 auto";
