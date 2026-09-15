# Deployment

The repository mirrors the existing `s3://andyanderin.com` website. The
`www.andyanderin.com` bucket only redirects to the apex domain, and the separate
`soundboard.andyanderin.com` DNS record is left untouched.

The secure delivery resources are CloudFront distribution `E1S5CKS9YC27IL`
(`dxstfoassy45s.cloudfront.net`), Origin Access Control `ELS3WMHWW4R84`, ACM
certificate `b10e153d-64b0-48bc-bdc9-7563a422687c`, and response headers policy
`4fc14084-7c44-46c7-964a-98b5de722064`. Route 53 aliases for the apex and `www`
names point to CloudFront; HTTP redirects to HTTPS.

GitHub Actions syncs content without `--delete`, excluding `.git`, `.github`, and
`deploy`. The IAM deployment role can list the bucket and upload objects, but
cannot delete them.

The active bucket is private with all four Block Public Access settings enabled.
Only the CloudFront distribution can read its objects. The `www` redirect bucket
is also blocked from public access and is no longer used for website delivery.

CloudFront uses the regular S3 endpoint with Origin Access Control. After DNS is
switched, replace the public bucket policy with one granting only the distribution
`s3:GetObject`, enable all four bucket Block Public Access settings, and disable
S3 website hosting. Keep ACM DNS validation records for renewal.
