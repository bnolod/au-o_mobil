import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import SocialBanner from './SocialBanner';
import { CommonStaticElementProps, SocialCardProps } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import Button from '../ui/Button';
import { router } from 'expo-router';
import LoadingModal from '../ui/LoadingModal';
import CollapsibleText from '../ui/CollapsibleText';

export default function SocialCard({
  language,
  colorScheme,
  group,
  event,
  type = 'GROUP',
  preview,
  onCreatePress,
}: CommonStaticElementProps & SocialCardProps) {
  if (!group && !event) return null;
  const item =
    group && !event
      ? {
          id: group.id,
          name: group.name,
          bannerImage: group.bannerImage,
          alias: group.alias,
          count: group.memberCount,
          public: group.public,
          creationDate: group.creationDate,
          isUserRelated: group.member,
          description: group.description,
        }
      : {
          id: event!.id,
          name: event!.name,
          bannerImage: event!.bannerImage,
          alias: '',
          count: event!.attendees,
          public: event!.public,
          creationDate: event!.creationDate,
          isUserRelated: event!.isAttending,
          description: event!.description,
        };
  if (item === undefined) return <LoadingModal loading={true} colorScheme={colorScheme} />;
  if (item)
    return (
      <View
        className="my-4"
        style={{
          shadowColor: Colors[colorScheme].background,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 20,
        }}
      >
        <View className={`${preview !== 'DISPLAY' ? ' ' : 'pointer-events-none'}`}>
          <SocialBanner
            id={item.id}
            language={language}
            colorScheme={colorScheme}
            name={item.alias}
            image={item.bannerImage}
            count={item.count}
            type={type}
            onPress={onCreatePress}
          />
        </View>
        <View className="social-card">
          <View className="social-card-container">
            <View className="basis-4/6">
              <ThemedText className="tlg leading-tight">
                {item.name}
                <ThemedText className="tsm p-3 font-semibold muted "> {item.alias}</ThemedText>
              </ThemedText>
              <CollapsibleText className="opacity-85">{item.description}</CollapsibleText>
            </View>
            <View className="flex  items-start gap-8">
              {!item.isUserRelated && (
                <Button onPress={!preview ? () => {} : () => {}} className="social-card-action-button">
                  {type === 'GROUP' ? 'Join' : 'Attend'}
                </Button>
              )}
              <Button
                className="social-card-secondary-button"
                onPress={
                  !preview
                    ? () => {
                        if (type === 'EVENT')
                          router.push({
                            pathname: `/(root)/(events)/[id]`,
                            params: {
                              id: item.id,
                            },
                          });
                        else
                          router.push({
                            pathname: `/(root)/(groups)/[id]`,
                            params: {
                              id: item.id,
                            },
                          });
                      }
                    : () => {}
                }
              >
                {type === 'GROUP' ? 'Visit group' : 'Details'}
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
}
