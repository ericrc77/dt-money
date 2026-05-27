import { ScrollView } from 'react-native'

import { CategoryButton, CategoryText, Container, Label } from './styles'
import { DEFAULT_CATEGORIES } from '../../utils/categories'

interface CategorySelectorProps {
  value: string
  categories?: string[]
  onChange: (category: string) => void
}

export function CategorySelector({
  value,
  categories = DEFAULT_CATEGORIES,
  onChange,
}: CategorySelectorProps) {
  const categoryOptions = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...categories]),
  )

  return (
    <Container>
      <Label>Categorias</Label>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {categoryOptions.map((category) => (
          <CategoryButton
            key={category}
            $isActive={category === value}
            activeOpacity={0.75}
            onPress={() => onChange(category)}
          >
            <CategoryText $isActive={category === value}>
              {category}
            </CategoryText>
          </CategoryButton>
        ))}
      </ScrollView>
    </Container>
  )
}
