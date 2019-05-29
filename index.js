'use strict';

const fs = require('fs');
const path = require('path');

class ModulesPath {

	static get(folder, moduleName) {

		if(!this.cache)
			this.cache = {};

		if(!this.cache[folder])
			this.cache[folder] = this.getFiles(folder);

		moduleName = moduleName.toLowerCase();

		return this.cache[folder][moduleName] || false;
	}

	static getFiles(folder) {

		const subPath = path.join(process.cwd(), folder);

		let dirContent;

		try {
			dirContent = fs.readdirSync(subPath);
		} catch(error) {
			dirContent = [];
		}

		let filesPaths = {};

		if(!dirContent.length)
			return filesPaths;

		dirContent.forEach(dirItem => {

			const dirItemFullPath = path.join(subPath, dirItem);

			if(fs.statSync(dirItemFullPath).isDirectory()) {
				const childrenFilesPaths = this.getFiles(path.join(folder, dirItem));
				filesPaths = { ...filesPaths, ...childrenFilesPaths };
			} else {
				const { name, dir } = path.parse(dirItemFullPath);
				filesPaths[name] = path.join(dir, name);
			}

		});

		return filesPaths;
	}

}

module.exports = ModulesPath;
