import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { Config } from '../../src/config';
import { IssueForm } from '../../src/issue-form';
import { Labeler } from '../../src/labeler';

import { basicConfig, emptyConfig, templateConfig } from './config.fixture';
import { basicForm, dropdownForm } from './issue-form.fixture';

describe('Test Labeler class', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test('smoke test', () => {
    const labeler = new Labeler(
      new IssueForm(basicForm),
      new Config(basicConfig, '.github/issue-labeler.yml')
    );

    expect(labeler).toBeInstanceOf(Labeler);
  });

  describe('input based labeling', () => {
    let labeler: Labeler;

    beforeEach(() => {
      vi.stubEnv('INPUT_SECTION', 'type');
      vi.stubEnv('INPUT_BLOCK-LIST', 'other\nnone\nOther');

      labeler = new Labeler(
        new IssueForm(dropdownForm),
        new Config(emptyConfig, '.github/issue-labeler.yml')
      );
    });

    test('initialization', () => {
      expect(labeler.isConfig).toBe(false);
      expect(labeler.isInputs).toBe(true);

      expect(labeler.section).toBe('type');
      expect(labeler.blockList).toMatchInlineSnapshot(`
        [
          "other",
          "none",
          "Other",
        ]
      `);

      expect(labeler.outputPolicy).toMatchInlineSnapshot(`
        {
          "section": {},
          "template": "",
        }
      `);
    });

    test('gatherLabels()', () => {
      const keywords = labeler.gatherLabels();

      expect(keywords).toMatchInlineSnapshot(`
        [
          "Bug Report",
          "Feature Request",
        ]
      `);
    });

    describe('inputBasedLabels()', () => {
      test('get labels', () => {
        const keywords = labeler.inputBasedLabels();

        expect(labeler.outputPolicy).toMatchInlineSnapshot(`
          {
            "section": {
              "type": [
                "Bug Report",
                "Feature Request",
              ],
            },
            "template": "",
          }
        `);
        expect(keywords).toMatchInlineSnapshot(`
          [
            "Bug Report",
            "Feature Request",
          ]
        `);
      });

      test('empty section or blocklist', () => {
        labeler.section = '';

        expect(() => labeler.inputBasedLabels()).toThrowError(
          'Section or block list is undefined!'
        );

        labeler.section = 'type';
        labeler.blockList = undefined;

        expect(() => labeler.inputBasedLabels()).toThrowError(
          'Section or block list is undefined!'
        );
      });

      test('empty section field', () => {
        labeler.section = 'nonexistent';

        const keywords = labeler.inputBasedLabels();

        expect(labeler.outputPolicy).toMatchInlineSnapshot(`
          {
            "section": {},
            "template": "",
          }
        `);
        expect(keywords).toBeUndefined();
      });
    });
  });

  describe('policy based labeling', () => {
    let labeler: Labeler;

    beforeEach(() => {
      vi.stubEnv('INPUT_TEMPLATE', 'bug.yml');

      labeler = new Labeler(
        new IssueForm(dropdownForm),
        new Config(templateConfig, '.github/issue-labeler.yml')
      );
    });

    test('initialization', () => {
      expect(labeler.isConfig).toBe(true);
      expect(labeler.isInputs).toBe(false);

      expect(labeler.outputPolicy).toMatchInlineSnapshot(`
        {
          "section": {},
          "template": "bug.yml",
        }
      `);
    });

    test('gatherLabels()', () => {
      const labels = labeler.gatherLabels();

      expect(labels).toMatchInlineSnapshot(`
        [
          "bug 🐛",
          "RFE 🎁",
          "high",
        ]
      `);
    });

    describe('configBasedLabels()', () => {
      test('get labels', () => {
        const labels = labeler.configBasedLabels();

        expect(labeler.outputPolicy).toMatchInlineSnapshot(`
          {
            "section": {
              "severity": [
                "high",
              ],
              "type": [
                "bug 🐛",
                "RFE 🎁",
              ],
            },
            "template": "bug.yml",
          }
        `);
        expect(labels).toMatchInlineSnapshot(`
          [
            "bug 🐛",
            "RFE 🎁",
            "high",
          ]
        `);
      });

      test('no policy provided', () => {
        labeler.config.policy = undefined;

        expect(() =>
          labeler.configBasedLabels()
        ).toThrowErrorMatchingInlineSnapshot(
          `[Error: Missing configuration. Please setup 'Advanced Issue Labeler' Action using '.github/issue-labeler.yml' file.]`
        );
      });
    });
  });
});
