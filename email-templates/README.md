# Templates Email Appiotti Game Shop

Place ces templates dans le dashboard Supabase :
**Authentication > Email Templates**

## Fichiers

| Fichier | Template Supabase | Variable |
|---|---|---|
| `confirmation-signup.html` | **Confirm signup** | `{{ .Token }}` |
| `reset-password.html` | **Magic Link** (pour reset) | `{{ .Token }}` |
| `magic-link.html` | **Magic Link** | `{{ .ConfirmationURL }}` |
| `email-change.html` | **Change Email Address** | `{{ .Token }}` |

## Comment installer

1. Va sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionne ton projet
3. Va dans **Authentication > Email Templates**
4. Copie-colle le HTML de chaque fichier dans le bon template
5. Clique **Save**

## Design

- Fond crème `#FFF8F0` cohérent avec le site
- Carte blanche avec bordures arrondies `32px`
- Header dégradé unique par type d'email
- Code OTP en grand avec police monospace
- Instructions numérotées avec pastilles dégradées
- Avertissement jaune/rouge pour sécurité
- Footer sobre avec mention Appiotti
