import SocialCard from '@/components/social/base/SocialCard';
import { getGroupsOfUser } from '@/lib/ApiCalls/GroupApiCalls';
import { Group } from '@/lib/entity/Group';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

interface OwnGroupListProps {
  userId: number;
}

export default function OwnGroupList(props: OwnGroupListProps) {
  const [groups, setGroups] = useState<Group[]>([]);

  const getGroups = async () => {
            console.log("ÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁ")
    const res = await getGroupsOfUser(props.userId);
    setGroups(res!);
    console.log('########## getting groups');
  };

  useEffect(() => {
            console.log("argrljjerngjkrng")
    getGroups();
    console.log("a222222222222222222222")
    console.log("groups:"+groups)

  }, []);

  return (
    <ScrollView>
      {groups.map((group) => {
        return <SocialCard type="GROUP" group={group} colorScheme={'dark'} language={'HU'} />;
      })}
    </ScrollView>
  );
}
