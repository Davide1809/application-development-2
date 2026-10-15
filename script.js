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

const contactForm = document.querySelector("#contact-form");
const contactFormFeedback = document.querySelector("#contact-form-feedback");
const contactFields = {
	name: document.querySelector("#contact-name"),
	email: document.querySelector("#contact-email"),
	topic: document.querySelector("#contact-topic"),
	message: document.querySelector("#contact-message")
};
let contactFormSubmitted = false;

function getContactFormErrors() {
	const values = {
		name: contactFields.name.value.trim(),
		email: contactFields.email.value.trim(),
		topic: contactFields.topic.value,
		message: contactFields.message.value.trim()
	};
	const errors = {};

	if (!values.name) {
		errors.name = "Enter your name.";
	}
	if (!values.email) {
		errors.email = "Enter your email address.";
	} else if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
		errors.email = "Enter a valid email address.";
	}
	if (!values.topic) {
		errors.topic = "Choose a topic.";
	}
	const minimumMessageLength = values.topic === "project-collaboration" ? 50 : 20;
	if (!values.message) {
		errors.message = "Enter a message.";
	} else if (values.message.length < minimumMessageLength) {
		errors.message = values.topic === "project-collaboration"
			? "Add a few more details about the collaboration (at least 50 characters)."
			: "Your message must be at least 20 characters.";
	}

	return { values, errors };
}

function showContactFormErrors(errors) {
	for (const [fieldName, field] of Object.entries(contactFields)) {
		const errorMessage = errors[fieldName] || "";
		document.querySelector(`#contact-${fieldName}-error`).textContent = errorMessage;
		field.setAttribute("aria-invalid", String(Boolean(errorMessage)));
	}
}

contactForm.addEventListener("input", () => {
	if (contactFormSubmitted) {
		const { errors } = getContactFormErrors();
		showContactFormErrors(errors);
		contactFormFeedback.textContent = Object.keys(errors).length
			? "Please correct the highlighted fields."
			: "The form is ready to submit.";
	}
});

contactForm.addEventListener("change", () => {
	if (contactFormSubmitted) {
		const { errors } = getContactFormErrors();
		showContactFormErrors(errors);
		contactFormFeedback.textContent = Object.keys(errors).length
			? "Please correct the highlighted fields."
			: "The form is ready to submit.";
	}
});

contactForm.addEventListener("submit", (event) => {
	event.preventDefault();
	contactFormSubmitted = true;

	const { values, errors } = getContactFormErrors();
	showContactFormErrors(errors);

	if (Object.keys(errors).length > 0) {
		contactFormFeedback.textContent = "Please correct the highlighted fields before sending.";
		contactFields[Object.keys(errors)[0]].focus();
		return;
	}

	const contactRequest = {
		name: values.name,
		email: values.email.toLowerCase(),
		topic: values.topic,
		message: values.message
	};
	console.log("Contact form payload:", contactRequest);
	contactFormFeedback.textContent = "Thanks for reaching out. Your message is ready to be sent.";
});

const apiPostList = document.querySelector("#api-post-list");
const apiPostsStatus = document.querySelector("#api-posts-status");
const apiPostForm = document.querySelector("#api-post-form");
const apiPostFeedback = document.querySelector("#api-post-feedback");
const apiPostResult = document.querySelector("#api-post-result");
const apiPostSubmit = document.querySelector("#api-post-submit");

function renderPosts(posts) {
	const postItems = posts.slice(0, 5).map((post) => {
		const item = document.createElement("li");
		const title = document.createElement("h4");
		const body = document.createElement("p");

		item.className = "api-post-item";
		title.textContent = post.title;
		body.textContent = post.body;
		item.append(title, body);
		return item;
	});

	apiPostList.replaceChildren(...postItems);
}

async function loadPosts() {
	apiPostsStatus.textContent = "Loading posts...";
	apiPostList.replaceChildren();

	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}.`);
		}

		const posts = await response.json();
		renderPosts(posts);
		apiPostsStatus.textContent = `Showing ${Math.min(posts.length, 5)} sample posts.`;
	} catch (error) {
		console.error("Unable to load sample posts:", error);
		apiPostsStatus.textContent = "Posts could not be loaded right now. Please try again later.";
	}
}

function showPostFormErrors(titleError, bodyError) {
	document.querySelector("#api-post-title-error").textContent = titleError;
	document.querySelector("#api-post-body-error").textContent = bodyError;
	document.querySelector("#api-post-title").setAttribute("aria-invalid", String(Boolean(titleError)));
	document.querySelector("#api-post-body").setAttribute("aria-invalid", String(Boolean(bodyError)));
}

async function createSamplePost(title, body) {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ title, body, userId: 1 })
	});
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}.`);
	}

	return response.json();
}

function renderCreatedPost(post) {
	const result = document.createElement("article");
	const title = document.createElement("h4");
	const body = document.createElement("p");
	const identifier = document.createElement("p");

	result.className = "api-created-post";
	title.textContent = post.title;
	body.textContent = post.body;
	identifier.textContent = `Returned post ID: ${post.id}`;
	result.append(title, body, identifier);
	apiPostResult.replaceChildren(result);
}

apiPostForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const title = document.querySelector("#api-post-title").value.trim();
	const body = document.querySelector("#api-post-body").value.trim();
	const titleError = title ? "" : "Enter a title.";
	const bodyError = body.length >= 10 ? "" : "Enter at least 10 characters of post details.";

	showPostFormErrors(titleError, bodyError);
	if (titleError || bodyError) {
		apiPostFeedback.textContent = "Please correct the highlighted fields.";
		return;
	}

	apiPostSubmit.disabled = true;
	apiPostFeedback.textContent = "Creating sample post...";
	apiPostResult.replaceChildren();

	try {
		const createdPost = await createSamplePost(title, body);
		renderCreatedPost(createdPost);
		apiPostFeedback.textContent = "Sample post created. JSONPlaceholder does not permanently save it.";
	} catch (error) {
		console.error("Unable to create sample post:", error);
		apiPostFeedback.textContent = "The sample post could not be created. Please try again.";
	} finally {
		apiPostSubmit.disabled = false;
	}
});

loadPosts();