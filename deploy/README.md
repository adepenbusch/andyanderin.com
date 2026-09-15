# Deployment

The repository mirrors the existing `s3://andyanderin.com` website. The
`www.andyanderin.com` bucket only redirects to the apex domain, and the separate
`soundboard.andyanderin.com` DNS record is left untouched.

GitHub Actions syncs content without `--delete`, excluding `.git`, `.github`, and
`deploy`. The IAM deployment role can list the bucket and upload objects, but
cannot delete them.

CloudFront uses the regular S3 endpoint with Origin Access Control. After DNS is
switched, replace the public bucket policy with one granting only the distribution
`s3:GetObject`, enable all four bucket Block Public Access settings, and disable
S3 website hosting. Keep ACM DNS validation records for renewal.
