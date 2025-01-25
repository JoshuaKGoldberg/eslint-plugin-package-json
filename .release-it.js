module.exports = {
	git: {
		commitMessage: "chore: release v${version}",
		requireCommits: true,
	},
	github: {
		release: true,
		releaseName: "v${version}",
		releaseNotes(context) {
			const groupTitles = {
				feat: "Features",
				fix: "Bug Fixes",
				perf: "Performance Improvements",
			};
			const commits = context.changelog.split("\n").slice(1);
			const groups = Object.groupBy(commits, (commit) => {
				// If it matches one of the types we care to show, then add the
				// commit to that group.
				for (const type in groupTitles) {
					const regex = new RegExp(`^\s*[-*]?\s*${type}[(:]`);
					if (regex.test(commit)) {
						return type;
					}
				}

				// If it didn't match any of the important groups, then add it to other
				return "other";
			});

			// Use the data we've collected to build the release notes.
			const releaseNotes = [];
			for (const type in groupTitles) {
				if (groups[type]) {
					releaseNotes.push(`### ${groupTitles[type]}`);
					releaseNotes.push(...groups[type]);
				}
			}
			return releaseNotes.join("\n");
		},
	},
	npm: { publishArgs: ["--access public", "--provenance"] },
	plugins: {
		"@release-it/conventional-changelog": {
			infile: "CHANGELOG.md",
			preset: "angular",
			types: [
				{ section: "Features", type: "feat" },
				{ section: "Bug Fixes", type: "fix" },
				{ section: "Performance Improvements", type: "perf" },
				{ hidden: true, type: "build" },
				{ hidden: true, type: "chore" },
				{ hidden: true, type: "ci" },
				{ hidden: true, type: "docs" },
				{ hidden: true, type: "refactor" },
				{ hidden: true, type: "style" },
				{ hidden: true, type: "test" },
			],
		},
	},
};
