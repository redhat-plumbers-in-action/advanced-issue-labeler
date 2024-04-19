import { describe, expect, test } from 'vitest';

import { IssueForm } from '../../src/issue-form';

const emptyForm = {};

const basicForm = {
  title: 'Test issue',
  body: 'Test body',
};

const dropdownForm = {
  title: 'Test issue',
  body: 'Test body',
  severity: 'high',
  multiDropdown: 'one, two, other, none',
  checkList: ['one', 'two', 'three'],
};

describe('Test IssueForm class', () => {
  test('IssueForm class is defined', () => {
    const issueForm = new IssueForm(basicForm);

    expect(issueForm.parsed).toMatchInlineSnapshot(`
      {
        "body": "Test body",
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
      `"high"`
    );
    expect(issueForm.getSafeProperty('nonexistent')).toBeUndefined();
  });

  test('listKeywords()', () => {
    const issueForm = new IssueForm(dropdownForm);

    expect(issueForm.listKeywords('severity', ['none'])).toMatchInlineSnapshot(`
      [
        "high",
      ]
    `);

    expect(issueForm.listKeywords('multiDropdown', ['other', 'none']))
      .toMatchInlineSnapshot(`
      [
        "one",
        "two",
      ]
    `);

    // Checklists are unsupported at the moment
    expect(issueForm.listKeywords('checkList', [])).toBeUndefined();
    expect(issueForm.listKeywords('nonexistent', ['none'])).toBeUndefined();
  });
});
