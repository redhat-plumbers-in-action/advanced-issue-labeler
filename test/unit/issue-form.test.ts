import { describe, expect, test } from 'vitest';

import { IssueForm } from '../../src/issue-form';
import { basicForm, dropdownForm } from './issue-form.fixture';

describe('Test IssueForm class', () => {
  test('smoke test', () => {
    const issueForm = new IssueForm(basicForm);

    expect(issueForm.parsed).toMatchInlineSnapshot(`
      {
        "body": "Test body",
        "severity": "High",
        "title": "Test issue",
      }
    `);
  });

  test('isProperty()', () => {
    const issueForm = new IssueForm(basicForm);

    expect(issueForm.isProperty('title')).toBe(true);
    expect(issueForm.isProperty('nonexistent')).toBe(false);
  });

  test('getSafeProperty()', () => {
    const issueForm = new IssueForm(dropdownForm);

    expect(issueForm.getSafeProperty('title')).toMatchInlineSnapshot(
      `"Test issue"`
    );
    expect(issueForm.getSafeProperty('severity')).toMatchInlineSnapshot(
      `"High"`
    );
    expect(issueForm.getSafeProperty('nonexistent')).toBeUndefined();
  });

  test('listKeywords()', () => {
    const issueForm = new IssueForm(dropdownForm);

    expect(issueForm.listKeywords('severity', ['none'])).toMatchInlineSnapshot(`
      [
        "High",
      ]
    `);

    expect(issueForm.listKeywords('type', ['other', 'none']))
      .toMatchInlineSnapshot(`
        [
          "Bug Report",
          "Feature Request",
        ]
      `);

    // Checklists are unsupported at the moment
    expect(issueForm.listKeywords('checkList', [])).toBeUndefined();
    expect(issueForm.listKeywords('nonexistent', ['none'])).toBeUndefined();
  });
});
