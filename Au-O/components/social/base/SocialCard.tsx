/**
 * Közösségi kártya komponens
 * @module social/base/SocialCard
 * @category Components
 */
import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import SocialBanner from './SocialBanner';
import { CommonStaticElementProps } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import LoadingModal from '@/components/ui/LoadingModal';
import CollapsibleText from '@/components/ui/CollapsibleText';
import { SocialCardProps } from './props';
import { GroupTexts } from '@/constants/texts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { joinGroup } from '@/lib/ApiCalls/GroupApiCalls';
/**
 * @param {CommonStaticElementProps & SocialCardProps} props - Tulajdonságok
 */
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
          alias: event!.name,
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
                {group && !group.public && <MaterialCommunityIcons name="lock-outline" />}
                {item.name}
                <ThemedText className="tsm p-3 font-semibold muted "> {item.alias}</ThemedText>
              </ThemedText>
              <CollapsibleText className="opacity-85">{item.description}</CollapsibleText>
            </View>
            <View className="flex items-start gap-3">
              {!item.isUserRelated && (
                <Button onPress={!preview ? () => {type === "GROUP" ? joinGroup(group!.id) : {}} : () => {}} className="social-card-action-button">
                  {type === 'GROUP'
                    ? group?.public
                      ? GroupTexts.buttons.join[language]
                      : group?.member
                      ? GroupTexts.actions.application.sent[language]
                      : GroupTexts.page.apply[language]
                    : 'Attend'}
                </Button>
              )}
              <Button
                className="social-card-secondary-button"
                onPress={
                  !preview
                    ? () => {
                        if (type === 'EVENT')
                          router.push({
                            pathname: `/(events)/[id]`,
                            params: {
                              id: item.id,
                            },
                          });
                        else


                          router.push({
                            pathname: `/(groups)/[id]`,
                            params: {
                              id: item.id,
                            },
                          });
                        
                        
                      }
                    : () => {}
                }
              >
                {type === 'GROUP' &&
                group?.validMember
                  ? group.public
                    ? GroupTexts.actions.visit[language]
                    : GroupTexts.actions.visit[language]
                  : group?.public
                  ? GroupTexts.actions.visit[language]
                  : GroupTexts.actions.details[language]}
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
}
