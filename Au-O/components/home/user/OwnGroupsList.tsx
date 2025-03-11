import SocialCard from '@/components/social/base/SocialCard';
import { getGroupsOfUser } from '@/lib/ApiCalls/GroupApiCalls';
import { Group } from '@/lib/entity/Group';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

interface OwnGroupListProps {
  userId: number;
  refreshing: boolean;
}

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
    <FlashList data={groups} renderItem={({item}) => (
      <SocialCard type="GROUP" group={item} colorScheme={'dark'} language={'HU'} />
    )}/>
  );
}
