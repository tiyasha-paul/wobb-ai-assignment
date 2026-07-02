import { describe, it, expect, beforeEach } from 'vitest';
import { useListStore } from './useListStore';
import type { SavedProfile } from './useListStore';

const mockProfile1: SavedProfile = {
  user_id: '123',
  username: 'testuser1',
  fullname: 'Test User 1',
  picture: 'https://example.com/pic1.jpg',
  followers: 1000,
  platform: 'instagram',
  is_verified: true,
};

const mockProfile2: SavedProfile = {
  user_id: '456',
  username: 'testuser2',
  fullname: 'Test User 2',
  picture: 'https://example.com/pic2.jpg',
  followers: 2000,
  platform: 'youtube',
  is_verified: false,
};

describe('useListStore', () => {
  beforeEach(() => {
    // Reset store state and localStorage before each test
    useListStore.setState({ profiles: [] });
    localStorage.clear();
  });

  it('addProfile adds a new profile to the list', () => {
    useListStore.getState().addProfile(mockProfile1);
    expect(useListStore.getState().profiles).toHaveLength(1);
    expect(useListStore.getState().profiles[0]).toEqual(mockProfile1);
  });

  it('addProfile does NOT add a duplicate (same user_id twice)', () => {
    useListStore.getState().addProfile(mockProfile1);
    useListStore.getState().addProfile(mockProfile1); // Attempt duplicate
    expect(useListStore.getState().profiles).toHaveLength(1);
  });

  it('removeProfile removes the correct profile by user_id', () => {
    useListStore.getState().addProfile(mockProfile1);
    useListStore.getState().addProfile(mockProfile2);
    useListStore.getState().removeProfile(mockProfile1.user_id);
    
    const profiles = useListStore.getState().profiles;
    expect(profiles).toHaveLength(1);
    expect(profiles[0].user_id).toBe(mockProfile2.user_id);
  });

  it('isInList correctly returns true/false', () => {
    useListStore.getState().addProfile(mockProfile1);
    expect(useListStore.getState().isInList(mockProfile1.user_id)).toBe(true);
    expect(useListStore.getState().isInList('non-existent-id')).toBe(false);
  });

  it('persistence: state under the "wobb-saved-profiles" key survives a simulated reset', () => {
    useListStore.getState().addProfile(mockProfile1);
    
    // Check if localStorage has been populated correctly by Zustand's persist middleware
    const savedStateStr = localStorage.getItem('wobb-saved-profiles');
    expect(savedStateStr).toBeTruthy();
    
    const parsedData = JSON.parse(savedStateStr as string);
    expect(parsedData.state.profiles).toHaveLength(1);
    expect(parsedData.state.profiles[0].user_id).toBe(mockProfile1.user_id);
  });
});
