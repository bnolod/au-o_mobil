import { FlashList } from '@shopify/flash-list';
import ChatHeader from '../base/ChatHeader';
import { DirectMessagePageProps } from '../props';
import DirectMessageItem from './DirectMessageItem';
import RecipientMessage from './RecipientMessage';
import UserMessage from './UserMessage';
import MessageBar from '../base/MessageBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

export default function DirectMessagePage({ user, recipient }: DirectMessagePageProps) {
  const messageIndices = [1, 2, 3, 4, 6, 8, 5, 7];
  return (
    <>
      <KeyboardAvoidingView behavior="padding" className=" h-full flex-1 justify-between background">
        <ChatHeader mainPage={false} user={recipient} onFilterChange={() => {}} />
        <FlashList
          inverted
          ListHeaderComponent={() => <MessageBar onChange={() => {}} onSend={() => {}} user={user} />}
          className="flex-1"
          data={messageIndices}
          renderItem={({ item, index }) =>
            item % 2 === 0 ? (
              <RecipientMessage
                nickname={recipient.nickname}
                isLast={!messageIndices[index+1] || messageIndices[index+1] % 2 !== 0 ? true : false} isFirst={!messageIndices[index-1] || messageIndices[index-1] % 2 !== 0 ? true : false}
                id={recipient.id}
                profilePic={recipient.profileImg}
                message={'teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeszt'}
              />
            ) : (
              <UserMessage isLast={!messageIndices[index+1] || messageIndices[index+1] % 2 === 0 ? true : false} isFirst={!messageIndices[index-1] || messageIndices[index-1] % 2 === 0 ? true : false} nickname={user.nickname} id={user.id} profilePic={user.profileImg} message={'teszt'} />
            )
          }
        />
      </KeyboardAvoidingView>
    </>
  );
}
