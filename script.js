const portfolioOwner = "Davide Silverii";
const projectCountInput = "4";
const projectCount = Number(projectCountInput);
const portfolioIsPublished = true;

const portfolio = {
	owner: portfolioOwner,
	field: "Cybersecurity and software development",
	university: "University of Rio Grande",
	projectCount: projectCount
};

const projects = [
	{
		title: "College Network Analysis",
		category: "Cybersecurity",
		tools: ["packet capture", "vulnerability assessment"]
	},
	{
		title: "Password Health Tracker",
		category: "Web security",
		tools: ["password assessment", "breach detection", "recommendations"]
	},
	{
		title: "Inventory Management Backend API",
		category: "Backend development",
		tools: ["API design", "database schema", "session authentication"]
	},
	{
		title: "C CLI E-Commerce and Inventory System",
		category: "C programming",
		tools: ["input validation", "string algorithms", "cart management"]
	}
];

function createProjectSummary(projectTitle, toolCount) {
	return `${projectTitle} highlights ${toolCount} technical areas.`;
}

console.log("Portfolio JavaScript loaded.");
console.log("Owner:", portfolio.owner, "| Field:", portfolio.field);
console.log("University:", portfolio.university);
console.log("Project count conversion:", projectCountInput, "->", projectCount);
console.log("Type of project count:", typeof projectCount);
console.log("First project:", projects[0].title);
console.log("Portfolio owner property:", portfolio.owner);

if (portfolioIsPublished === true && projectCount >= 3) {
	console.log("Portfolio status: published with a strong project selection.");
} else {
	console.log("Portfolio status: keep adding work before sharing widely.");
}

console.log(createProjectSummary(projects[0].title, projects[0].tools.length));
console.log(createProjectSummary(projects[1].title, projects[1].tools.length));

for (const project of projects) {
	console.log(`${project.title} [${project.category}] uses: ${project.tools.join(", ")}.`);
}

const projectSearchInput = document.querySelector("#project-search-input");
const projectStatus = document.querySelector("#project-status");
const projectCards = document.querySelectorAll("#projects article[data-project-id]");
const savedProjectList = document.querySelector("#saved-project-list");
const savedProjectsEmptyMessage = document.querySelector("#saved-projects-empty");

function filterProjects() {
	const searchTerm = projectSearchInput.value.trim().toLowerCase();
	let visibleProjectCount = 0;

	for (const projectCard of projectCards) {
		const projectText = `${projectCard.querySelector("h3").textContent} ${projectCard.querySelector("p").textContent}`.toLowerCase();
		const matchesSearch = projectText.includes(searchTerm);
		projectCard.classList.toggle("is-filtered-out", !matchesSearch);
		visibleProjectCount += Number(matchesSearch);
	}

	projectStatus.textContent = searchTerm
		? `Showing ${visibleProjectCount} of ${projectCards.length} projects for "${projectSearchInput.value.trim()}".`
		: `Showing all ${visibleProjectCount} projects.`;
}

function toggleSavedProject(event) {
	const saveButton = event.currentTarget;
	const projectCard = saveButton.closest("article[data-project-id]");
	const projectId = projectCard.dataset.projectId;
	const projectTitle = projectCard.querySelector("h3").textContent;
	const isSaved = projectCard.classList.toggle("is-saved");

	saveButton.setAttribute("aria-pressed", String(isSaved));
	saveButton.textContent = isSaved ? "Project saved" : "Save project";

	if (isSaved) {
		const savedProjectItem = document.createElement("li");
		savedProjectItem.dataset.projectId = projectId;
		savedProjectItem.textContent = projectTitle;
		savedProjectList.append(savedProjectItem);
	} else {
		const savedProjectItem = Array.from(savedProjectList.children)
			.find((item) => item.dataset.projectId === projectId);
		savedProjectItem.remove();
	}

	savedProjectsEmptyMessage.classList.toggle("is-hidden", savedProjectList.children.length > 0);
	console.log(`${projectTitle} ${isSaved ? "saved to" : "removed from"} your project list.`);
}

projectSearchInput.addEventListener("input", filterProjects);

for (const saveButton of document.querySelectorAll(".save-project-button")) {
	saveButton.addEventListener("click", toggleSavedProject);
}

console.log(`Project Explorer ready with ${projectCards.length} interactive project cards.`);