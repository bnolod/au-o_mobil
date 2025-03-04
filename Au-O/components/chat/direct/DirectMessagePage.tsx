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
  return (
    <>
    <KeyboardAvoidingView behavior='padding' className=' h-full flex-1 justify-between background'>
      <ChatHeader mainPage={false} user={recipient} onFilterChange={() => {}} />
      <FlashList
inverted
ListHeaderComponent={() => (
  <MessageBar onChange={() => {}} onSend={() => {}} user={user}/>

)}
        className='flex-1'
        data={[1, 2, 3, 4]}
        renderItem={({item}) => (
          item % 2 === 0 ?
          <RecipientMessage
          nickname={recipient.nickname}
          id={recipient.id}
          profilePic={recipient.profileImg}
            message={'teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeszt'}
            />
          :
          <UserMessage nickname={user.nickname}
          id={user.id}
          profilePic={user.profileImg}
          message={'teszt'}
          />
        )}
      />
    </KeyboardAvoidingView>
      </>
  );
}
