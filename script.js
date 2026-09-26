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