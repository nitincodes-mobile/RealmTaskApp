import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Main layout
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f6f7fb;
`;

export const PersonalWorkSpace = styled.View`
  flex: 1;
  padding-horizontal: 21px;
  padding-top: 12px;
`;

export const TopRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;

export const HeaderContent = styled.View``;

export const EyeBrow = styled.Text`
  font-size: 9px;
  letter-spacing: 1.7px;
  color: #959ba8;
  font-weight: 800;
`;

export const Heading = styled.Text`
  font-size: 31px;
  color: #202431;
  font-weight: 800;
  margin-top: 4px;
  letter-spacing: -1px;
`;

export const HeadingDot = styled.Text`
  color: #635bee;
`;

export const Avatar = styled.View`
  height: 43px;
  width: 43px;
  border-radius: 15px;
  background-color: #e8e6ff;
  align-items: center;
  justify-content: center;
`;

export const AvatarText = styled.Text`
  font-size: 17px;
  color: #635bee;
  font-weight: 800;
`;

// Summary card
export const SummaryCard = styled.View`
  background-color: #27283f;
  border-radius: 22px;
  padding: 19px;
  margin-bottom: 25px;
`;

export const SummaryTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SummaryLabel = styled.Text`
  font-size: 9px;
  color: #b9b9d0;
  letter-spacing: 1.4px;
  font-weight: 800;
`;

export const SummaryTitle = styled.Text`
  font-size: 17px;
  color: #ffffff;
  font-weight: 700;
  margin-top: 6px;
`;

export const ProgressBadge = styled.View`
  background-color: #41415d;
  padding-horizontal: 11px;
  padding-vertical: 7px;
  border-radius: 10px;
`;

export const ProgressBadgeText = styled.Text`
  color: #d5d2ff;
  font-weight: 800;
  font-size: 12px;
`;

export const ProgressTrack = styled.View`
  height: 7px;
  border-radius: 8px;
  background-color: #45455f;
  margin-top: 18px;
  overflow: hidden;
`;

export const ProgressFill = styled.View<{ progress: number }>`
  height: 7px;
  border-radius: 8px;
  background-color: #918aff;
  width: ${({ progress }) => `${progress * 100}%`};
`;

export const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
`;

export const StatItem = styled.View``;

export const StatNumber = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-weight: 800;
`;

export const StatLabel = styled.Text`
  font-size: 10px;
  color: #b9b9d0;
  margin-top: 3px;
`;

export const StatDivider = styled.View`
  height: 27px;
  width: 1px;
  background-color: #4b4b65;
`;

// Tasks section
export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 19px;
  color: #242735;
  font-weight: 800;
`;

export const ClearText = styled.Text`
  font-size: 11px;
  color: #827be8;
  font-weight: 700;
`;

export const SearchBox = styled.View`
  height: 47px;
  border-radius: 14px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #eef0f3;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 13px;
`;

export const SearchIcon = styled.Text`
  font-size: 23px;
  color: #959ba8;
  margin-right: 9px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  color: #292d3a;
  font-size: 13px;
  padding-vertical: 0px;
`;

export const ClearSearch = styled.Text`
  font-size: 22px;
  color: #9298a6;
  padding-horizontal: 5px;
`;

export const FilterRow = styled.View`
  flex-direction: row;
  margin-top: 14px;
  margin-bottom: 13px;
  gap: 8px;
`;

export const FilterChip = styled.Pressable<{ active: boolean }>`
  padding-horizontal: 15px;
  padding-vertical: 8px;
  border-radius: 10px;
  background-color: ${({ active }) => (active ? '#635BEE' : '#ECEEF3')};
`;

export const FilterText = styled.Text<{ active: boolean }>`
  font-size: 11px;
  font-weight: 700;
  color: ${({ active }) => (active ? '#FFFFFF' : '#7F8592')};
`;

// Task list
export const TaskList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 12,
    flexGrow: 1,
  },
})``;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 42px;
`;

export const EmptyIcon = styled.View`
  height: 53px;
  width: 53px;
  border-radius: 18px;
  background-color: #eae8ff;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
`;

export const EmptyIconText = styled.Text`
  font-size: 24px;
  color: #635bee;
  font-weight: 800;
`;

export const EmptyTitle = styled.Text`
  font-size: 15px;
  color: #333746;
  font-weight: 800;
`;

export const EmptySubtitle = styled.Text`
  font-size: 12px;
  color: #9298a6;
  margin-top: 5px;
`;

// Add task button
export const AddButton = styled.Pressable`
  height: 54px;
  background-color: #635bee;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: ${Platform.OS === 'ios' ? '8px' : '13px'};
  shadow-color: #635bee;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-offset: 0px 5px;
  elevation: 4;
`;

export const AddIcon = styled.Text`
  font-size: 23px;
  color: #ffffff;
  margin-right: 8px;
  margin-top: -2px;
`;

export const AddButtonText = styled.Text`
  font-size: 14px;
  color: #ffffff;
  font-weight: 800;
`;

// Modal
export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const ModalBackdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(20, 22, 35, 0.45);
`;

export const ModalSheet = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-horizontal: 22px;
  padding-top: 11px;
  padding-bottom: ${Platform.OS === 'ios' ? '30px' : '22px'};
  max-height: 88%;
`;

export const ModalHandle = styled.View`
  width: 39px;
  height: 4px;
  border-radius: 4px;
  background-color: #d9dce3;
  align-self: center;
  margin-bottom: 18px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;

export const ModalTitle = styled.Text`
  font-size: 21px;
  color: #242735;
  font-weight: 800;
`;

export const CloseButton = styled.Text`
  font-size: 27px;
  color: #9298a6;
  padding-horizontal: 4px;
`;

export const FieldLabel = styled.Text`
  font-size: 10px;
  color: #818795;
  letter-spacing: 1.1px;
  font-weight: 800;
  margin-bottom: 9px;
  margin-top: 8px;
`;

export const FieldInput = styled.TextInput`
  border-width: 1px;
  border-color: #e8eaf0;
  border-radius: 13px;
  padding-horizontal: 13px;
  padding-vertical: 13px;
  font-size: 14px;
  color: #252938;
  margin-bottom: 13px;
`;

export const NotesInput = styled(FieldInput)`
  height: 86px;
`;

export const PriorityRow = styled.View`
  flex-direction: row;
  gap: 9px;
  margin-bottom: 23px;
`;

export const PriorityOption = styled.Pressable<{ active: boolean }>`
  flex: 1;
  border-width: 1px;
  border-color: ${({ active }) => (active ? '#635BEE' : '#E8EAF0')};
  background-color: ${({ active }) => (active ? '#EFEEFF' : '#FFFFFF')};
  border-radius: 11px;
  align-items: center;
  padding-vertical: 11px;
`;

export const PriorityOptionText = styled.Text<{ active: boolean }>`
  font-size: 12px;
  color: ${({ active }) => (active ? '#635BEE' : '#777E8B')};
  font-weight: 700;
`;

export const SaveButton = styled.Pressable`
  height: 52px;
  background-color: #635bee;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

export const SaveButtonText = styled.Text`
  font-size: 14px;
  color: #ffffff;
  font-weight: 800;
`;

export const KeyboardWrapper = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-end;
`;
