import { describe, it, expect, beforeEach, test } from 'vitest';

import { IssueForm } from '../../src/issue-form';

import {
  IIssueFormTestContext,
  issueFormContextFixture,
} from './fixtures/issue-form.fixture';

describe('IssueForm Object', () => {
  beforeEach<IIssueFormTestContext>(context => {
    context.issueForms = issueFormContextFixture.issueForms;
    context.blockLists = issueFormContextFixture.blockLists;
    context.invalid = issueFormContextFixture.invalid;
  });

  it<IIssueFormTestContext>('can be instantiated', context =>
    context.issueForms.map(issueFormItem =>
      expect(issueFormItem).toBeDefined()
    ));

  // private
  test.todo('get parsed()');

  test<IIssueFormTestContext>('isProperty()', context => {
    context.issueForms.map(issueFormItem => {
      expect(issueFormItem.isProperty('')).toEqual(false);
      expect(issueFormItem.isProperty('description')).toMatchSnapshot();
    });

    let issueForm = new IssueForm({ section: 'content' });
    expect(issueForm.isProperty('section')).toEqual(true);
  });

  test<IIssueFormTestContext>('getProperty()', context => {
    context.issueForms.map(issueFormItem => {
      expect(issueFormItem.getProperty('')).toBeUndefined();
      expect(issueFormItem.getProperty('description')).toMatchSnapshot();
    });

    let issueForm = new IssueForm({ section: 'content' });
    expect(issueForm.getProperty('section')).toEqual('content');
  });

  test<IIssueFormTestContext>('getSafeProperty()', context => {
    context.issueForms.map(issueFormItem => {
      expect(issueFormItem.getSafeProperty('')).toBeUndefined();
      expect(issueFormItem.getSafeProperty('description')).toMatchSnapshot();
    });

    let issueForm = new IssueForm({ section: 'content' });
    expect(issueForm.getSafeProperty('section')).toEqual('content');
  });

  test<IIssueFormTestContext>('listKeywords()', context => {
    context.issueForms.map(issueFormItem =>
      context.blockLists.map(blockListItem => {
        expect(
          issueFormItem.listKeywords('type', blockListItem)
        ).toMatchSnapshot();
        expect(
          issueFormItem.listKeywords('component', blockListItem)
        ).toMatchSnapshot();
      })
    );
  });

  test('isCompliant()', () => {
    const issueForm = new IssueForm({});
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    expect(issueForm.isCompliant(['item1'], undefined)).toEqual(false);

    expect(issueForm.isCompliant(['item1', 'item2', 'item3'], 'item1')).toEqual(
      true
    );

    expect(issueForm.isCompliant(['item1', 'item2', 'item3'], 'item4')).toEqual(
      false
    );
  });
});
