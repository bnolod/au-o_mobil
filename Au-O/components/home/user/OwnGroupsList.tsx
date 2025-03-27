/**
 * Sajt csoportok
 * @module home/user/OwnGroupList
 * @category Component
 */

import SocialCard from '@/components/social/base/SocialCard';
import { getGroupsOfUser } from '@/lib/ApiCalls/GroupApiCalls';
import { Group } from '@/lib/entity/Group';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { OwnGroupListProps } from './props';

/**
 * Saját csoport lista
 * @param {OwnGroupListProps} props
 */
export default function OwnGroupList(props: OwnGroupListProps) {
  const [groups, setGroups] = useState<Group[]>([]);

  const getGroups = async () => {
    const res = await getGroupsOfUser(props.userId);
    setGroups(res!);
  };

  useEffect(() => {
    getGroups();
  }, [props.refreshing]);

  return (
    <FlashList
    estimatedItemSize={236}
      data={groups}
      renderItem={({ item }) => <SocialCard type="GROUP" group={item} colorScheme={'dark'} language={'HU'} />}
    />
  );
}
