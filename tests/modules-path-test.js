'use strict';

const fs = require('fs');
const mock = require('mock-fs');

const assert = require('assert');
const sandbox = require('sinon').createSandbox();

const ModulesPath = require('./../index.js');

/* eslint-disable prefer-arrow-callback */

describe('ModulesPath', function() {

	beforeEach(() => {
		mock({
			modules: {
				'foo.js': ''
			},
			empty: {},
			recursive: {
				subpath: {
					'foo.js': '',
					'bar.js': ''
				}
			}
		});
	});

	afterEach(() => {
		mock.restore();
		ModulesPath.cache = null;
		sandbox.restore();
	});

	it('should cache files for given folder', function() {

		const spy = sandbox.spy(ModulesPath, 'getFiles');

		const resFoo = ModulesPath.get('modules', 'foo');

		sandbox.assert.calledOnce(spy);

		const resBar = ModulesPath.get('modules', 'bar');

		sandbox.assert.calledOnce(spy);

		assert(fs.existsSync(`${resFoo}.js`), 'Should exists');
		assert(!resBar);
	});

	it('should cache files recursive for given folder', function() {

		const spy = sandbox.spy(ModulesPath, 'getFiles');

		const resFoo = ModulesPath.get('recursive', 'foo');

		sandbox.assert.calledTwice(spy); // twice because reads 2 directories

		const resBar = ModulesPath.get('recursive', 'bar');

		sandbox.assert.calledTwice(spy); // twice because reads 2 directories

		assert(fs.existsSync(`${resFoo}.js`), 'Should exists');
		assert(fs.existsSync(`${resBar}.js`), 'Should exists');
	});

	it('should return \'false\' when module not found in an empty folder', function() {

		const spy = sandbox.spy(ModulesPath, 'getFiles');

		const resFoo = ModulesPath.get('empty', 'foo');

		assert(!resFoo);

		sandbox.assert.calledOnce(spy);
	});

	it('should return \'false\' when fs rejects with unknown folder', function() {

		const resFoo = ModulesPath.get('unknown-folder', 'foo');

		assert(!resFoo);
	});

});
